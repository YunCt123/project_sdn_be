// routes/cartRouter.js
const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/auth");

cartRouter.get("/", verifyToken, cartController.getCart);
cartRouter.post("/", verifyToken, cartController.addToCart);
cartRouter.put("/:id", verifyToken, cartController.updateCartItem);
cartRouter.delete("/:id", verifyToken, cartController.deleteCartItem);

module.exports = cartRouter;
