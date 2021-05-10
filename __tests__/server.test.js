// const request = require('supertest')
// const app = 'https://hidden-mesa-04199.herokuapp.com/'
// const app_local = require('../src/server.js')

// var yelp = require('supertest')
// yelp = yelp('https://api.yelp.com/v3/businesses/search')

describe('Yelp ', () => {
  it('ensures that the Yelp API is functional', async () => {
        const response = await yelp.get('').set('location', 'austin').set('Authorization', 'Bearer ' + process.env.YELP_API_KEY)
        console.log(response)
        // expect(response).to
    });
})