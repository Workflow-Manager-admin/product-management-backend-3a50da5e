const productService = require('../services/product');

/**
 * Controller for handling product CRUD operations.
 */
class ProductController {
  // PUBLIC_INTERFACE
  async getAll(req, res) {
    /** Get all products */
    const products = productService.getAllProducts();
    res.json(products);
  }

  // PUBLIC_INTERFACE
  async getById(req, res) {
    /** Get product by ID */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid product ID.' });
    const product = productService.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  }

  // PUBLIC_INTERFACE
  async create(req, res) {
    /** Create new product */
    const { name, price, description } = req.body;
    const product = productService.createProduct({ name, price, description });
    res.status(201).json(product);
  }

  // PUBLIC_INTERFACE
  async update(req, res) {
    /** Update product by ID */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid product ID.' });

    const { name, price, description } = req.body;
    const updated = productService.updateProduct(id, { name, price, description });
    if (!updated) return res.status(404).json({ error: 'Product not found.' });
    res.json(updated);
  }

  // PUBLIC_INTERFACE
  async delete(req, res) {
    /** Delete product by ID */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid product ID.' });
    const ok = productService.deleteProduct(id);
    if (!ok) return res.status(404).json({ error: 'Product not found.' });
    res.status(204).send();
  }
}

module.exports = new ProductController();
