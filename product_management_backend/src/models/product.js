let currentId = 1;

/**
 * In-memory storage for products.
 * Each product: { id, name, price, description }
 */
class ProductModel {
  constructor() {
    this.products = [];
  }

  // PUBLIC_INTERFACE
  create(productData) {
    /** Create a new product */
    const newProduct = {
      id: currentId++,
      name: productData.name,
      price: productData.price,
      description: productData.description
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // PUBLIC_INTERFACE
  findAll() {
    /** Retrieve all products */
    return this.products;
  }

  // PUBLIC_INTERFACE
  findById(id) {
    /** Find a product by ID */
    return this.products.find(p => p.id === id);
  }

  // PUBLIC_INTERFACE
  update(id, updateData) {
    /** Update product by ID */
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updateData, id };
    return this.products[idx];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Delete product by ID */
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }
}

module.exports = new ProductModel();
