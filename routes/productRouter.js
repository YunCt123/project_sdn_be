const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/auth");
const upload = require("../middleware/uploadCloudinary");

// Lấy tất cả sản phẩm
productRouter.get("/", productController.getAllProducts);

// Lấy sản phẩm theo ID
productRouter.get("/:id", productController.getProductById);

// Thêm sản phẩm mới
// productRouter.post("/",verifyTokenAndAdmin, productController.createProduct);

// Cập nhật sản phẩm
productRouter.put("/:id",verifyTokenAndAdmin, productController.updateProduct);

// Xóa sản phẩm
productRouter.delete("/:id",verifyTokenAndAdmin, productController.deleteProduct);

// Route tạo sản phẩm mới, upload 1 ảnh
productRouter.post('/',verifyTokenAndAdmin, productController.createProduct);

// Review endpoints lồng trong product
productRouter.get('/:productId/reviews', reviewController.getAllReviews);
productRouter.post('/:productId/reviews', verifyToken, reviewController.createReview);
productRouter.get('/:productId/reviews/:reviewId', reviewController.getReviewById);
productRouter.put('/:productId/reviews/:reviewId', verifyToken, reviewController.updateReview);
productRouter.delete('/:productId/reviews/:reviewId', verifyToken, reviewController.deleteReview);


module.exports = productRouter;
