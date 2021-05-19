// /* eslint-disable no-undef */
// /* eslint-disable indent */
// const request = require('supertest');
// const app = require('../src/app');
// const nock = require('nock');
// const response = require('./response.json');

// // describe('Local tests ', () => {
// //   test('ensures that the locally deployed server is functional', () => 
// //     // eslint-disable-next-line max-len
// // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
// //     // const response = await request(app).get('/').set('location', 'austin').set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
// //     // expect(response.statusCode).toBe(200);
// //     // return request(app).get('/').set('location', 'austin')
// //     // .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
// //     // .expect(200);
// //   )
// // });

// // describe('Test the root path', () => {
// //   test('It should response the GET method', (done) => {
// //     request(app)
// eslint-disable-next-line max-len
// //       .get('/').set('location', 'austin').set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
// //       .then((response) => {
// //         expect(response.statusCode).toBe(200);
// //         done();
// //       });
// //   });
// // });

// describe('Get User tests', () => {
//   beforeEach(() => {
//     nock('https://api.yelp.com/v3')
//       .get('/businesses/search?location=austin&limit=50')
//       .reply(200, response);
//   });

//   // eslint-disable-next-line arrow-body-style
//   it('Get a user by username', (done) => {
//     request(app)
// eslint-disable-next-line max-len
//       .get('/').set('location', 'austin').set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });
