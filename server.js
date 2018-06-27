'use strict';

// TODO: Add application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// TODO: Add application setup
const app = express();
const PORT = process.env.PORT

// TODO: Set up database
const client = new pg.Client(process.env.DATAbASE_URL);
client.connect();
client.on('error', err => console.log(err));

// TODO: Add application middlware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // REVIEW-TODO: Check to make sure we understand exactly what this is doing.

// TODO: API endpoints
// app.get('http://api.yummly.com/v1', (req, res) => {
//   console.log('This is a working GET request to yummly API!');
//   let SQL = `SELECT * FROM recipes;`
//     .then(results => res.send(results.rows))
//     .catch(console.error);
// })

app.get('/', (req, res) => res.send('Something in there. Doesn\'t matter what. -Luther is the bomb'));

app.post('/api/v1/thats-so-cravin', (req, res) => {
  console.log(req.body);
  let SQL = `
  INSERT INTO users(first_name, last_name, username, password)
  VALUES ($1, $2, $3, $4);
	`;
  let values = [
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    req.body.password
  ];
  client.query(SQL, values)
    .then(results => res.send(`insert complete`))
    .catch(console.error)
  ;
});

// CHANGE-TODO: Get rid of this line once everything is working.
// app.get('/', (req, res) => res.send('Something in there. Doesn\'t matter what. -Luther'));

// This get request is to add user preferences to the search function.

// TODO: Communicate with DB to retrieve user preferences(allowed_allergy, allowed_diet)
app.get('/api/v1/users', (req, res) => {
  console.log(`This is for the allergies query`);
  let SQL = `SELECT allowed_allergy, allowed_diet
    FROM users
    WHERE user_id = 1;`;
    // TODO: The 1 needs to be a variable
    
  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
})

// TODO: Set up 404
// app.get('*', (req, res) => res.status(404).send('This route does not exist!'));

app.listen(PORT, () => console.log(`The server is alive an well, listening on port ${PORT}`));



