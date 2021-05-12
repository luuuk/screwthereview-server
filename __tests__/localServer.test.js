/* eslint-disable no-undef */
/* eslint-disable indent */
const request = require('supertest');
const app = require('../src/app');

describe('Local tests ', () => {
  test.skip('ensures that the locally deployed server is functional', async () => {
    const response = await request(app).get('/').set('location', 'austin').set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
    expect(response.statusCode).toBe(200);
  });
});
