/* eslint-disable no-console */
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bing = require('bing-scraper');

// Whitelist is localhost:3000 for development and production site URL
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://screwthereview.netlify.app'];

const baseURL = 'https://api.yelp.com/v3/businesses/search';

// Returns a new experience from the Yelp API
function getExperience(URL, res) {
  axios.get(URL, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  }).then((value) => {
    const randomNum = Math.floor(Math.random() * value.data.businesses.length);
    let randomBiz = value.data.businesses[randomNum];
    if (!randomBiz) {
      res.writeHead(404, { 'Content-Type': 'text/json' });
      res.write('Unable to find experience. Loosen filter requirements and try again.');
      console.log('Unable to find experience. Client should loosen filter requirements and try again.');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json' });
      console.log(`Found business ${randomBiz.name}`);

      // TODO: Scrape and append Business Description and Hours to business
      bing.search({
        q: randomBiz.alias + randomBiz.location,
        enforceLanguage: true,
      }, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Found description: ${resp.results[1].description}`);
          const desc = { description: resp.sidebar.snippet };
          // const desc = { description: resp.results[1].description };
          randomBiz = { ...randomBiz, ...desc };
          res.write(JSON.stringify(randomBiz));
          res.send();
        }
      });
    }
  }).catch((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      res.writeHead(err.response.status);
      res.write("Yelp doesn't like your request. Try again. Remember, categories must be valid from Yelp and price must be an int between 1 and 4");
      console.log('Error from Yelp');
      console.log(err.response);
    } else if (err.request) {
      // client never received a response, or request never left
      res.writeHead(err.request, '500');
      console.log('Error sending request');
    } else {
      // anything else
      console.log('Unidentified error');
      console.log(err);
    }
    res.end();
  });
}

// Constructs the search URL to use in the Yelp API
// Takes a request and response fron Axios as Parameters
// ------------------------------------------------------
// Sends an initial request to Yelp to determine total # of results, then uses this information to
// pick a random business from the returned results
function constructURL(req, res) {
  console.log('Constructing URL');
  let URL = `${baseURL}?location=${req.headers.location}`;

  if (req.headers.price) {
    URL = `${URL}&price=${req.headers.price}`;
  }

  if (req.headers.radius) {
    const metersPerMile = 1609.344;
    const miles = req.headers.radius.split(' ')[0];
    URL = `${URL}&radius=${Math.round(miles * metersPerMile)}`;
  }

  if (req.headers.keywords) {
    const keywordList = req.headers.keywords.split(', ');
    URL = `${URL}&term=${keywordList[0]}`;
    for (let i = 1; i < keywordList.length; i += 1) {
      URL = `${URL},${keywordList[i]}`;
    }
  }

  if (req.headers.categories) {
    const catList = req.headers.categories.split(', ');
    URL = `${URL}&categories=${catList[0]}`;
    for (let i = 1; i < catList.length; i += 1) {
      URL = `${URL},${catList[i]}`;
    }
  }

  URL += '&limit=50';

  console.log(`making initial call to ${URL}`);
  axios.get(URL, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  }).then((value) => {
    const randomNum = Math.floor(Math.random() * Math.min(value.data.total, 1000));
    URL = `${URL}&offset=${randomNum}`;
    console.log(`Got ${value.data.total} experiences`);
    getExperience(URL, res);
  }).catch((err) => {
    console.log(`Error on initial Yelp request: ${err}`);
    const temp = err.toJSON();
    console.log(temp);
    // client received an error response (5xx, 4xx)
    res.writeHead(err.response.status);
    res.write("Yelp doesn't like your request. Try again. Remember, categories must be valid from Yelp and price must be an int between 1 and 4");
    res.end();
  });
}

// Define app and check request against whitelist
const app = express().use(cors({
  origin(origin, callback) {
    // allow requests with no origin (e.g postman)
    if (!origin) {
      console.log('request from undefined origin');
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) === -1) {
      const message = `The CORS policy for this origin doesnt allow access from the particular origin: ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
}));

// Creates a server that responds with a JSON String representing a business
app.get('/', (req, res) => {
  if (!req.headers.location) {
    console.log('404 Error - no location provided');
    res.writeHead(404, 'error');
    res.write('No location provided - please input a location');
    res.end();
  } else {
    constructURL(req, res);
  }
});

module.exports = app;
