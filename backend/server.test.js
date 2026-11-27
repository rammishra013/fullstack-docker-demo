const request = require('supertest');
const app = require('./server');

describe('Backend API Unit Tests', () => {
  test('GET /health should return 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'healthy' });
  });
});

