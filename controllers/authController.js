const Account = require("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký tài khoản mới
exports.register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Kiểm tra email đã tồn tại
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Mã hóa mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo tài khoản mới (cho phép truyền isAdmin khi test)
    const account = new Account({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const savedAccount = await account.save();

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: savedAccount._id,
        email: savedAccount.email,
        isAdmin: savedAccount.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      account: {
        id: savedAccount._id,
        name: savedAccount.name,
        email: savedAccount.email,
        isAdmin: savedAccount.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra tài khoản tồn tại
    const account = await Account.findOne({ email });
    if (!account) {
      console.log(`[LOGIN FAIL] Email not found: ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      console.log(`[LOGIN FAIL] Wrong password for email: ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: account._id,
        email: account.email,
        isAdmin: account.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      account: {
        id: account._id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        gender: account.gender,
        address: account.address,
        isAdmin: account.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin profile người dùng hiện tại
exports.getProfile = async (req, res) => {
  try {
    const account = await Account.findById(req.user.id).select("-password");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, gender, dateOfBirth } = req.body;
    const accountId = req.user.id;

    // Kiểm tra email đã tồn tại (nếu thay đổi email)
    if (email) {
      const existingAccount = await Account.findOne({
        email,
        _id: { $ne: accountId },
      });
      if (existingAccount) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Gom các trường cần cập nhật
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (gender !== undefined) updateData.gender = gender;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      message: "Profile updated successfully",
      account: updatedAccount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const accountId = req.user.id;

    // Lấy thông tin tài khoản
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Kiểm tra mật khẩu hiện tại
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      account.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Mã hóa mật khẩu mới
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Cập nhật mật khẩu
    await Account.findByIdAndUpdate(accountId, {
      password: hashedNewPassword,
    });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const account = await Account.findById(decoded.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Tạo token mới
    const newToken = jwt.sign(
      {
        id: account._id,
        email: account.email,
        isAdmin: account.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Token refreshed successfully",
      token: newToken,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
