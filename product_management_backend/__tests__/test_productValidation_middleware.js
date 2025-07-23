const { validateProduct } = require('../src/middleware/productValidation');

function getRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
}

describe('productValidation middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: {} };
    res = getRes();
    next = jest.fn();
  });

  it('calls next for valid product', () => {
    req.body = { name: 'X', price: 9.99, description: 'Test desc' };
    validateProduct(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('rejects empty name', () => {
    req.body = { name: '', price: 1, description: 'desc' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects missing name', () => {
    req.body = { price: 2, description: 'desc' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects invalid price', () => {
    req.body = { name: 'y', price: -10, description: 'desc' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);

    req.body = { name: 'y', price: 'not-a-number', description: 'desc' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);

    req.body = { name: 'y', price: NaN, description: 'desc' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects empty description', () => {
    req.body = { name: 'n', price: 1, description: '' };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects missing description', () => {
    req.body = { name: 'n', price: 1 };
    validateProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
