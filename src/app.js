/* eslint-disable no-console */
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

// Whitelist is localhost:3000 for development and production site URL
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://screwthereview.netlify.app'];

const baseURL = 'https://api.yelp.com/v3/businesses/search';
// eslint-disable-next-line no-unused-vars
const descURL = 'https://www.yelp.com/biz/'; // TBD, this could change

// Scrapes description and hours from Yelp business page
// eslint-disable-next-line no-unused-vars
function scrapeDescription(biz) {
  // let scrape_response = await axios(descURL + biz.id).catch((err) => console.log(err));

  // if(scrape_response.status !== 200){
  //     console.log("Error occurred while fetching data");
  //     return;
  // };

  // TODO: parse description and hours here
  return { description: 'Test Description' };
  // console.log(response)
  // hours table - Class contains OpenhoursOpenhoursrow
  // description - Class starts w
  // $('[class^="business"]').get()
}

// Returns a new experience from the Yelp API
function getExperience(URL, req, response) {
  axios.get(URL, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  }).then((value) => {
    const randomNum = Math.floor(Math.random() * value.data.businesses.length);
    let randomBiz = value.data.businesses[randomNum];
    if (!randomBiz) {
      response.writeHead(404, { 'Content-Type': 'text/json' });
      response.write('Unable to find experience. Loosen filter requirements and try again.');
      console.log('Unable to find experience. Client should loosen filter requirements and try again.');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      console.log(`Found business ${randomBiz.name}`);

      // TODO: Scrape and append Business Description and Hours to business
      const bizDescription = scrapeDescription(randomBiz);
      console.log(`Found description: ${bizDescription}`);
      randomBiz = { ...randomBiz, ...bizDescription };

      response.write(JSON.stringify(randomBiz));
    }
    response.end();
  }).catch((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      response.writeHead(err.response.status, '500');
      response.write("Yelp doesn't like your request. Try again. Remember, categories must be valid from Yelp and price must be an int between 1 and 4");
      console.log('Error from Yelp');
      console.log(err.response);
    } else if (err.request) {
      // client never received a response, or request never left
      response.writeHead(err.request, '500');
      console.log('Error sending request');
    } else {
      // anything else
      console.log('Unidentified error');
      console.log(err);
    }
    response.end();
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

  axios.get(URL, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  }).then((value) => {
    const randomNum = Math.floor(Math.random() * Math.min(value.data.total, 1000));
    URL = `${URL}&offset=${randomNum}`;
    console.log(`Got ${value.data.total} experiences`);
    console.log(URL);
    getExperience(URL, req, res);
  }).catch((err) => {
    console.log(`Error on initial Yelp request ${err}`);
    return err;
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
