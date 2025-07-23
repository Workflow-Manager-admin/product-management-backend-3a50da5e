const reviewModel = require('../models/review');
const productModel = require('../models/product');

/**
 * ReviewService encapsulates business logic for Reviews.
 */
class ReviewService {
  // PUBLIC_INTERFACE
  getReviewsForProduct(productId) {
    /** Returns all reviews for a product */
    return reviewModel.findAllForProduct(productId);
  }

  // PUBLIC_INTERFACE
  getReviewById(id) {
    /** Gets a review by its ID */
    return reviewModel.findById(id);
  }

  // PUBLIC_INTERFACE
  createReview(data) {
    /** Creates a new review; only if product exists */
    const product = productModel.findById(data.productId);
    if (!product) return null;
    return reviewModel.create(data);
  }

  // PUBLIC_INTERFACE
  updateReview(id, data) {
    /** Updates review by ID */
    return reviewModel.update(id, data);
  }

  // PUBLIC_INTERFACE
  deleteReview(id) {
    /** Deletes review by ID */
    return reviewModel.delete(id);
  }
}

module.exports = new ReviewService();
