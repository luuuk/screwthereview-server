/* eslint-disable no-undef */
/* eslint-disable indent */
const axios = require('axios');
const request = require('supertest');
const app = require('../src/app');
const response = require('./response.json');
const noResultsResponse = require('./noResultsResponse.json');

jest.mock('axios');

describe('Get Experience Tests', () => {
  // eslint-disable-next-line arrow-body-style
  it('Get an experience with location and Auth header tokens should work', (done) => {
    axios.get.mockImplementation(() => Promise.resolve(response));
    request(app).get('/').set('location', 'austin').then((value) => {
        expect(value.statusCode).toBe(200);
        done();
      });
  });

  // eslint-disable-next-line arrow-body-style
  it('Get an experience without location should return error', (done) => {
    axios.get.mockImplementation(() => Promise.resolve(response));
    request(app).get('/').then((value) => {
        expect(value.statusCode).toBe(404);
        expect(value.text).toBe('No location provided - please input a location');
        done();
      });
  });

  // eslint-disable-next-line arrow-body-style
  it('Get experience with too strict filters should return error', (done) => {
    axios.get.mockImplementationOnce(() => Promise.resolve(response))
    .mockImplementationOnce(() => Promise.resolve(noResultsResponse));
    request(app).get('/').set('location', 'austin').then((value) => {
        expect(value.statusCode).toBe(404);
        expect(value.text).toBe('Unable to find experience. Loosen filter requirements and try again.');
        done();
      });
  });
});
