const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

// Lấy tất cả sản phẩm
productRouter.get("/", productController.getAllProducts);

// Lấy sản phẩm theo ID
productRouter.get("/:id", productController.getProductById);

// Thêm sản phẩm mới
productRouter.post("/", productController.createProduct);

// Cập nhật sản phẩm
productRouter.put("/:id", productController.updateProduct);

// Xóa sản phẩm
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;