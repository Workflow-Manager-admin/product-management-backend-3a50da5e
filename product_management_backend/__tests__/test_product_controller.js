const ProductController = require('../src/controllers/product');
const productService = require('../src/services/product');

jest.mock('../src/services/product');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  res.send   = jest.fn().mockReturnValue(res);
  return res;
}

describe('ProductController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('returns all products', async () => {
      const products = [{ id: 1, name: 'a', price: 10, description: 'desc' }];
      productService.getAllProducts.mockReturnValue(products);

      const req = {};
      const res = mockRes();

      await ProductController.getAll(req, res);

      expect(productService.getAllProducts).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(products);
    });
  });

  describe('getById', () => {
    it('returns 400 if id invalid', async () => {
      const req = { params: { id: 'abc' } };
      const res = mockRes();

      await ProductController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid product ID.' });
    });

    it('returns 404 if not found', async () => {
      productService.getProductById.mockReturnValue(undefined);
      const req = { params: { id: '2' } };
      const res = mockRes();

      await ProductController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found.' });
    });

    it('returns product if found', async () => {
      productService.getProductById.mockReturnValue({ id: 2, name: 'B' });
      const req = { params: { id: '2' } };
      const res = mockRes();

      await ProductController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 2, name: 'B' });
    });
  });

  describe('create', () => {
    it('creates a product successfully', async () => {
      const newProd = { id: 7, name: 'N', price: 42, description: 'yes' };
      productService.createProduct.mockReturnValue(newProd);
      const req = { body: { ...newProd } };
      const res = mockRes();

      await ProductController.create(req, res);
      expect(productService.createProduct).toHaveBeenCalledWith(newProd);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newProd);
    });
  });

  describe('update', () => {
    it('returns 400 if invalid id', async () => {
      const req = { params: { id: 'abc' }, body: {} };
      const res = mockRes();

      await ProductController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 404 if not found', async () => {
      productService.updateProduct.mockReturnValue(null);
      const req = { params: { id: '999' }, body: { name: 'Q', price: 10, description: 'qq' } };
      const res = mockRes();

      await ProductController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found.' });
    });

    it('returns updated product', async () => {
      const updated = { id: 10, name: 'U', price: 100, description: 'Updated' };
      productService.updateProduct.mockReturnValue(updated);
      const req = { params: { id: '10' }, body: updated };
      const res = mockRes();

      await ProductController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe('delete', () => {
    it('returns 400 for invalid id', async () => {
      const req = { params: { id: '-a-' } };
      const res = mockRes();

      await ProductController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 404 for not found', async () => {
      productService.deleteProduct.mockReturnValue(false);
      const req = { params: { id: '8' } };
      const res = mockRes();

      await ProductController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found.' });
    });

    it('returns 204 on successful delete', async () => {
      productService.deleteProduct.mockReturnValue(true);
      const req = { params: { id: '5' } };
      const res = mockRes();

      await ProductController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
