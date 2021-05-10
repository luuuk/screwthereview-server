var request = require('supertest')
const server_url = 'https://hidden-mesa-04199.herokuapp.com/'
request = request(server_url)

describe('Server tests ', () => {
    it('ensures that the heroku deployed server is functional', async () => {
          const response = await request.get('').set('location', 'austin')
          var result = JSON.parse(response.text)
          expect(result.id).toHaveLength(22)
      });
  })

var yelp = require('supertest')
yelp = yelp('https://api.yelp.com/v3/businesses/search')

// describe('Yelp ', () => {
//   it('ensures that the Yelp API is functional', async () => {
//         const response = await yelp.get('').set('location', 'austin').set('Authorization', 'Bearer ' + process.env.YELP_API_KEY)
//         console.log(response)
//         expect(response).to
//     });
// })

const app_local = require('../src/server.js')
