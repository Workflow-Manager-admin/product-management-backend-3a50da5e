const express = require('express');
const healthController = require('../controllers/health');
const productRoutes = require('./products');
const reviewRoutes = require('./reviews'); // Add reviews routes

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

 // Mount product management routes under /products
 router.use('/products', productRoutes);
 // Mount review management routes at root
 router.use('/', reviewRoutes);

 module.exports = router;
