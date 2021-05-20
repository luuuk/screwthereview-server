/* eslint-disable no-undef */
/* eslint-disable indent */
const axios = require('axios');
const request = require('supertest');
const app = require('../src/app');
const response = require('./response.json');

jest.mock('axios');

describe('Get Experience Tests', () => {
  // eslint-disable-next-line arrow-body-style
  it('Get an experience with location and Auth header tokens', (done) => {
    axios.get.mockImplementation(() => Promise.resolve(response));
    request(app)
      .get('/').set('location', 'austin').set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .then((value) => {
        expect(value.statusCode).toBe(200);
        done();
      });
  });
});
