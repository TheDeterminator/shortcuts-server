const express = require('express');
const url = require('url');
const fs = require('fs').promises; // Use the promisified version
const moment = require('moment');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Pool, Client } = require('pg');
const { getDates } = require('./testFunction');



const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

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


const PORT = process.env.PORT || 3000;

// app.listen(PORT, '192.168.1.229', () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));