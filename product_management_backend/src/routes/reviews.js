const express = require('express');
const reviewController = require('../controllers/review');
const { validateReview } = require('../middleware/reviewValidation');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews endpoints
 */

/**
 * @swagger
 * /products/{productId}/reviews:
 *   get:
 *     summary: List all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/products/:productId/reviews', reviewController.getAllForProduct.bind(reviewController));

/**
 * @swagger
 * /reviews/{reviewId}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: A review
 *       404:
 *         description: Review not found
 */
router.get('/reviews/:reviewId', reviewController.getById.bind(reviewController));

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, user, rating, text]
 *             properties:
 *               productId:
 *                 type: integer
 *               user:
 *                 type: string
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Validation error
 *       404:
 *         description: Associated product not found
 */
router.post('/reviews', validateReview, reviewController.create.bind(reviewController));

/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user, rating, text]
 *             properties:
 *               user:
 *                 type: string
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated review
 *       400:
 *         description: Validation error
 *       404:
 *         description: Review not found
 */
router.put('/reviews/:reviewId', validateReview, reviewController.update.bind(reviewController));

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete('/reviews/:reviewId', reviewController.delete.bind(reviewController));

module.exports = router;
