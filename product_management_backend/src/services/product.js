const productModel = require('../models/product');

/**
 * ProductService encapsulates business logic for Products.
 */
class ProductService {
  // PUBLIC_INTERFACE
  getAllProducts() {
    /** Returns all products */
    return productModel.findAll();
  }

  // PUBLIC_INTERFACE
  getProductById(id) {
    /** Gets a product by its ID */
    return productModel.findById(id);
  }

  // PUBLIC_INTERFACE
  createProduct(data) {
    /** Creates a new product */
    return productModel.create(data);
  }

  // PUBLIC_INTERFACE
  updateProduct(id, data) {
    /** Updates product by ID */
    return productModel.update(id, data);
  }

  // PUBLIC_INTERFACE
  deleteProduct(id) {
    /** Deletes product by ID */
    return productModel.delete(id);
  }
}

module.exports = new ProductService();
