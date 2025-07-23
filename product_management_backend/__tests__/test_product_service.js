const ProductModel = require('../src/models/product');
const ProductService = require('../src/services/product');

// Reset products by replacing array
beforeEach(() => {
  ProductModel.products.length = 0;
  ProductModel.products.push(
    { id: 1, name: 'A', price: 10, description: 'a' },
    { id: 2, name: 'B', price: 20, description: 'b' }
  );
});

describe('ProductService', () => {
  it('getAllProducts returns all products', () => {
    expect(ProductService.getAllProducts()).toHaveLength(2);
  });

  it('getProductById returns correct product', () => {
    expect(ProductService.getProductById(1).name).toBe('A');
    expect(ProductService.getProductById(999)).toBeFalsy();
  });

  it('createProduct adds and returns correct product', () => {
    const prod = ProductService.createProduct({ name: 'C', price: 30, description: 'c' });
    expect(prod.name).toBe('C');
    expect(ProductService.getAllProducts()).toHaveLength(3);
  });

  it('updateProduct returns null if not found', () => {
    expect(ProductService.updateProduct(99, { name: 'NO', price: 1, description: 'no' })).toBeNull();
  });

  it('updateProduct updates and returns product', () => {
    const updated = ProductService.updateProduct(1, { name: 'AA', price: 15, description: 'aa' });
    expect(updated.name).toBe('AA');
    expect(updated.price).toBe(15);
    expect(updated.description).toBe('aa');
  });

  it('deleteProduct returns true when deleted, false if not found', () => {
    expect(ProductService.deleteProduct(2)).toBe(true);
    expect(ProductService.deleteProduct(9999)).toBe(false);
    expect(ProductService.getAllProducts()).toHaveLength(1);
  });
});
