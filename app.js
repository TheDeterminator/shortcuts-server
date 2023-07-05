const express = require('express');
const url = require('url');
const fs = require('fs').promises; // Use the promisified version

const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db/index.js');
const axios = require('axios');
const cheerio = require('cheerio');


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
  console.log('>>>>>>', req.body.eventTimeStamp)
  const eventTimeStamp = req.body.eventTimeStamp ? new Date(req.body.eventTimeStamp) : new Date();
  const notes = req.body.notes;

  try {
    const result = await db.query('INSERT INTO sleep_data (event_timestamp, event_timestamp_with_timezone, event_type, notes) VALUES ($1, $2, $3, $4) RETURNING *;', [eventTimeStamp, eventTimeStamp, eventType, notes]);
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
    ORDER BY event_timestamp_with_timezone DESC
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

app.post('/frequency', async (req, res) => {
  const urlArrayString = req.body.urls; // Array
  if (!urlArrayString) {
    return res.status(400).json({ error: 'Url is required' });
  }

  const urls = urlArrayString.split('\n'); // validate input to make sure they are all valid urls

  const titles = await Promise.all(urls.map(async url => {
    try {
      // Fetch the page
      const response = await axios.get(url);

      // Load page into cheerio
      const $ = cheerio.load(response.data);

      // Get metadata
      const metadata = {
        url: url,
        title: $('head title').text().replace(' - Google Search', ''), // You could make the replace logic a method which would give you an excuse to make the object a class
        favicon: $('link[rel="shortcut icon"]').attr('href'),
        description: $('meta[name=description]').attr('content'),
        image: $('meta[property="og:image"]').attr('content')
      };
      return metadata.title;
    } catch (error) {
      console.error('Error fetching url:', url, error);
      return ''; // Return empty string for failed fetches
    }
  }));

  // Remove any empty titles (from failed fetches)
  const validTitles = titles.filter(title => title !== '');

  // Send the titles as response
  res.send(validTitles.join('\n'))
});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));