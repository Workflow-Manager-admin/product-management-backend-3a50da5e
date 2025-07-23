/**
 * PUBLIC_INTERFACE
 * Middleware to validate request body for create/update product.
 */
function validateProduct(req, res, next) {
  const { name, price, description } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Product name is required and must be a string.' });
  }
  if (typeof price !== 'number' || isNaN(price) || price < 0) {
    return res.status(400).json({ error: 'Product price is required and must be a non-negative number.' });
  }
  if (typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'Product description is required and must be a string.' });
  }
  next();
}

module.exports = { validateProduct };
