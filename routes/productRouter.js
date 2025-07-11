const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../middleware/auth");

// Lấy tất cả sản phẩm
productRouter.get("/", productController.getAllProducts);

// Lấy sản phẩm theo ID
productRouter.get("/:id", productController.getProductById);

// Thêm sản phẩm mới
productRouter.post("/",verifyTokenAndAdmin, productController.createProduct);

// Cập nhật sản phẩm
productRouter.put("/:id",verifyTokenAndAdmin , productController.updateProduct);

// Xóa sản phẩm
productRouter.delete("/:id",verifyTokenAndAdmin, productController.deleteProduct);

module.exports = productRouter;
