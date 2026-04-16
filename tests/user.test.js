const request = require('supertest');
const app = require('../app');
 
describe('User API Tests', () => {
 
  test('GET /users should return empty array initially', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
 
  test('POST /users should create user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Nitin' });
 
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Nitin');
  });
 
  test('POST /users without name should fail', async () => {
    const res = await request(app)
      .post('/users')
      .send({});
 
    expect(res.statusCode).toBe(400);
  });
 
});
