const Account = require("../models/account");

// Tạo account mới
exports.createAccount = async (req, res) => {
  try {
    const account = new Account(req.body);
    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả account
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy account theo ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật account (chỉ cho phép update name, email, isAdmin)
exports.updateAccount = async (req, res) => {
  try {
    const allowedFields = ["name", "email", "isAdmin"];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
