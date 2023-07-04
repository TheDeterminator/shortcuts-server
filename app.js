const express = require('express');
const url = require('url');
const fs = require('fs').promises; // Use the promisified version
// const moment = require('moment');
const bodyParser = require('body-parser');
require('dotenv').config();
// const { Pool, Client } = require('pg');
// import * as db from '../db.js' TODO: import using babel
const db = require('./db/index.js');

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/send-file', async (req, res) => {
  console.log(`Request received from ${req.ip}`)
  console.log('req.body', req.body)

  const { textData, fileName } = req.body;

  try {
    await fs.writeFile(fileName, textData, 'utf-8');
    console.log('File saved successfully');
    res.status(200).send('File saved successfully');
  } catch (err) {
    console.error('Error saving file:', err);
    res.status(500).send('Error saving file', err);
  }
});

app.get('/ping', async (req, res) => {
  console.log('hit /send-file')
  res.send({ complete: true })
});

app.post('/search', (req, res) => {
  const searchUrl = req.body.url;
  const parsedUrl = url.parse(searchUrl, true);
  const searchTerm = parsedUrl.query.q;

  if (!searchTerm) {
    return res.status(400).send({ error: "Invalid URL or No 'q' parameter found in query string" });
  }

  res.send({ searchQuery: searchTerm });
});

app.post('/screen-width', (req, res) => {
  console.log('GET request received at /screen-width');
  console.log(req.body);
  res.send({ message: 'GET request received' });
})


app.get('/send-file-to-database', async (req, res) => {
  getDates();
  res.send(dateArray);
})

app.post('/log-event', async (req, res) => {
  // TODO: add additional db logging in main db file follow node-postgres guide
  // TODO: Log the request body somewhere as well
  const eventType = req.body.eventType;
  // Is this stable? I think so, but maybe more validatiosn would be good
  const eventTimeStamp = req.body.eventTimeStamp ? new Date(req.body.eventTimeStamp.replace(' at ', ' ')).toUTCString().slice(0,25) : new Date().toUTCString().slice(0,25);
  const notes = req.body.notes;

  // console.log(req.body.eventTimeStamp)
  // console.log({eventTimeStamp})
  console.log('new Date().toUTCString()', new Date().toUTCString())
  console.log('new Date()', new Date())
  try {
    const result = await db.query('INSERT INTO sleep_data (event_timestamp, event_type, notes) VALUES ($1, $2, $3) RETURNING *;', [eventTimeStamp, eventType, notes]);
    // console.log({result})
    res.send(result.rows[0])
  }
  catch (err) {
    // console.error('catch error', err, 'err.__proto__', Object.keys(err.__proto__));
    res.send(err);
  }
})

app.post('/get-events', async (req, res) => {
  const eventType = req.body.eventType;
  const numResultsToReturn = req.body.numResults || 10;

  try {
    const result = await db.query(`SELECT *
    FROM sleep_data
    WHERE event_type = ANY($1::sleep_event_type[])
    ORDER BY event_timestamp DESC
    LIMIT $2;
    `, [eventType, numResultsToReturn]);
    console.log({ result })
    res.send(result.rows)
  }
  catch (err) {
    // console.error('catch error', err, 'err.__proto__', Object.keys(err.__proto__));
    res.send(err);
  }
})

app.delete('/delete-event/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await db.query(`DELETE FROM sleep_data WHERE id = $1`, [eventId]);

    if (result.rowCount === 0) {
      // If no rows were deleted, the event with this ID does not exist
      res.status(404).send('Event not found');
    } else {
      // If the row was deleted successfully, send a success message
      res.send('Event deleted successfully');
    }
  }
  catch (err) {
    // console.error('catch error', err, 'err.__proto__', Object.keys(err.__proto__));
    res.status(500).send(err);
  }
});

app.get('/promise-test', async (req, res) => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {

      resolve('blarrrrh');
    }, 5000);
  });

  let x = await p;

  res.send(x);
})


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));