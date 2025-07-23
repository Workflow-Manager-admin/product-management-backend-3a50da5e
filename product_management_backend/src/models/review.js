let currentId = 1;

/**
 * In-memory storage for product reviews.
 * Each review: { id, productId, user, rating, text }
 */
class ReviewModel {
  constructor() {
    this.reviews = [];
  }

  // PUBLIC_INTERFACE
  create(reviewData) {
    /** Create a new review */
    const newReview = {
      id: currentId++,
      productId: reviewData.productId,
      user: reviewData.user,
      rating: reviewData.rating,
      text: reviewData.text
    };
    this.reviews.push(newReview);
    return newReview;
  }

  // PUBLIC_INTERFACE
  findAllForProduct(productId) {
    /** Retrieve all reviews for a given product */
    return this.reviews.filter(r => r.productId === productId);
  }

  // PUBLIC_INTERFACE
  findById(id) {
    /** Find a review by ID */
    return this.reviews.find(r => r.id === id);
  }

  // PUBLIC_INTERFACE
  update(id, updateData) {
    /** Update review by ID */
    const idx = this.reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.reviews[idx] = { ...this.reviews[idx], ...updateData, id };
    return this.reviews[idx];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Delete review by ID */
    const idx = this.reviews.findIndex(r => r.id === id);
    if (idx === -1) return false;
    this.reviews.splice(idx, 1);
    return true;
  }
}

module.exports = new ReviewModel();
