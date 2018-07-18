const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');  // example

const defaultPort = 8080;

/*
  Important:
  calling path.join() in Windows would result in '\' but not '/',
  not desired for constructing api end points.
*/
const apiEndPointPrefix = '/api/';

const app = express();

// How to retrieve POST query parameters?
// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
// https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Put all API endpoints under '/api'
// example
// GET /api/passwords
app.get(apiEndPointPrefix + 'passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// test
// POST /api/test
app.post(apiEndPointPrefix + 'test', (req, res) => {
  const reqBody = req.body;
  console.log('Resequest received:');
  console.log(reqBody);
  console.log(`Button ${reqBody.btnPressed} is pressed.`);
  res.json({
    message: `Request: ${JSON.stringify(reqBody)} received`,
    buttonA: reqBody.btnA
  });
});

// The "catchall" handler: for any request that doesn't
// match one above
// app.get('*', (req, res) => {
//   res.status(404).send('Not found');
// });

const port = process.env.PORT || defaultPort;
app.listen(port);

console.log(`express-api-server-trial listening on ${port}`);