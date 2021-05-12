/* eslint-disable no-undef */
/* eslint-disable indent */
let request = require('supertest');

const URL = 'https://hidden-mesa-04199.herokuapp.com/';
request = request(URL);
const yelpIDLength = 22;

describe('Server tests ', () => {
  it('ensures that the heroku deployed server is functional', async () => {
      const response = await request.get('').set('location', 'austin');
      const result = JSON.parse(response.text);
      expect(result.id).toHaveLength(yelpIDLength);
  });
});
