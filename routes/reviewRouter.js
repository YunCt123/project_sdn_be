const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController');

// Review routes
reviewRouter.post('/reviews', reviewController.createReview);
reviewRouter.get('/reviews', reviewController.getAllReviews);
reviewRouter.get('/reviews/:id', reviewController.getReviewById);
reviewRouter.put('/reviews/:id', reviewController.updateReview);
reviewRouter.delete('/reviews/:id', reviewController.deleteReview);

module.exports = reviewRouter;
