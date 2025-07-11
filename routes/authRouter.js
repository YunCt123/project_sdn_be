const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/refresh-token", authController.refreshToken);

authRouter.get("/profile", verifyToken, authController.getProfile);

authRouter.put("/profile", verifyToken, authController.updateProfile);

authRouter.put("/change-password", verifyToken, authController.changePassword);

module.exports = authRouter;
