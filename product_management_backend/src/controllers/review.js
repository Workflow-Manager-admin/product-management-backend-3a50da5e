const reviewService = require('../services/review');

/**
 * Controller for handling review CRUD operations.
 */
class ReviewController {
  // PUBLIC_INTERFACE
  async getAllForProduct(req, res) {
    /** Get all reviews for a product */
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) return res.status(400).json({ error: 'Invalid productId.' });
    const reviews = reviewService.getReviewsForProduct(productId);
    res.json(reviews);
  }

  // PUBLIC_INTERFACE
  async getById(req, res) {
    /** Get review by ID */
    const id = parseInt(req.params.reviewId, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid review ID.' });
    const review = reviewService.getReviewById(id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json(review);
  }

  // PUBLIC_INTERFACE
  async create(req, res) {
    /** Create new review (only for existing products) */
    const { productId, user, rating, text } = req.body;
    const review = reviewService.createReview({ productId, user, rating, text });
    if (!review) return res.status(404).json({ error: 'Associated product not found.' });
    res.status(201).json(review);
  }

  // PUBLIC_INTERFACE
  async update(req, res) {
    /** Update review by ID */
    const id = parseInt(req.params.reviewId, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid review ID.' });
    // Only allow changes to rating, text, user (not productId)
    const { user, rating, text } = req.body;
    const updated = reviewService.updateReview(id, { user, rating, text });
    if (!updated) return res.status(404).json({ error: 'Review not found.' });
    res.json(updated);
  }

  // PUBLIC_INTERFACE
  async delete(req, res) {
    /** Delete review by ID */
    const id = parseInt(req.params.reviewId, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid review ID.' });
    const ok = reviewService.deleteReview(id);
    if (!ok) return res.status(404).json({ error: 'Review not found.' });
    res.status(204).send();
  }
}

module.exports = new ReviewController();
