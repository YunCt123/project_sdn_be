const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/accountController");
const { verifyTokenAndAdmin } = require("../middleware/auth");

// Admin quản lý tài khoản
accountRouter.post("/", verifyTokenAndAdmin, accountController.createAccount);
accountRouter.get("/", verifyTokenAndAdmin, accountController.getAllAccounts);
accountRouter.get(
  "/:id",
  verifyTokenAndAdmin,
  accountController.getAccountById
);

accountRouter.put("/:id", verifyTokenAndAdmin, accountController.updateAccount);

accountRouter.delete(
  "/:id",
  verifyTokenAndAdmin,
  accountController.deleteAccount
);

module.exports = accountRouter;
