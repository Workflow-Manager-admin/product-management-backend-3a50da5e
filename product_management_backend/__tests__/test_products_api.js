const request = require('supertest');
const app = require('../src/app');

describe('Product API integration', () => {
  let server;
  beforeAll(() => {
    server = app.listen(0); // Random port
  });
  afterAll((done) => {
    server.close(done);
  });

  let productId;

  it('GET /products should return [] initially', async () => {
    const res = await request(server).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /products should validate input', async () => {
    const res = await request(server).post('/products').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('POST /products creates a product', async () => {
    const res = await request(server)
      .post('/products')
      .send({ name: 'APIProd', price: 99, description: 'desc' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('APIProd');
    productId = res.body.id;
  });

  it('GET /products returns newly created product', async () => {
    const res = await request(server).get('/products');
    expect(res.body.find(p => p.id === productId)).toBeTruthy();
  });

  it('GET /products/:id returns the product', async () => {
    const res = await request(server).get('/products/' + productId);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it('GET /products/:id 404 on not found', async () => {
    const res = await request(server).get('/products/99999');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('PUT /products/:id updates the product', async () => {
    const res = await request(server)
      .put('/products/' + productId)
      .send({ name: 'updated', price: 11, description: 'changed' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('updated');
  });

  it('PUT /products/:id returns 404 for missing', async () => {
    const res = await request(server)
      .put('/products/99999')
      .send({ name: 'X', price: 0, description: 'x' });
    expect(res.status).toBe(404);
  });

  it('PUT /products/:id validates body', async () => {
    const res = await request(server)
      .put('/products/' + productId)
      .send({ name: '', price: 10, description: 'bad' });
    expect(res.status).toBe(400);
  });

  it('DELETE /products/:id deletes the product', async () => {
    const res = await request(server).delete('/products/' + productId);
    expect(res.status).toBe(204);
  });

  it('DELETE /products/:id returns 404 when not found', async () => {
    const res = await request(server).delete('/products/99999');
    expect(res.status).toBe(404);
  });
});

describe('Health endpoint', () => {
  let server;
  beforeAll(() => { server = app.listen(0); });
  afterAll((done) => { server.close(done); });

  it('GET / returns health and metadata', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('environment');
  });
});
