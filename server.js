'use strict';

// TODO: Add application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// TODO: Add application setup
const app = express();
const PORT = process.env.PORT // CHANGE-TODO: May need to set port by default. 

// TODO: Set up database
const client = new pg.Client(process.env.DATABASE_URL);
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

app.get('/', (req, res) => res.send('Something in there. Doesn\'t matter what. -Luther'));

// TODO: Set up 404
// app.get('*', (req, res) => res.status(404).send('This route does not exist!'));

app.listen(PORT, () => console.log(`The server is alive an well, listening on port ${PORT}`));