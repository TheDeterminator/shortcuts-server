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
  // return res.send({ message: 'Hello world' });
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



// app.get('/test', (req, res) => {
//   // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   return res.send({ message: 'test' });
// });


// app.get('/db', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM test_table');
//     const results = { 'results': (result) ? result.rows : null };
//     res.send(results);
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err);
//   }
// })

// function showTimes() {
//   const times = process.env.TIMES || 5;
//   let result = '';
//   for (let i = 0; i < times; i++) {
//     result += i + ' ';
//   }
//   return result;
// }

// app.get('/times', (req, res) => {
  //   res.send(showTimes());
  // });
  
// app.get('/app-data', async (req, res) => {
//   try {
//     const appData = await fs.readFile('sleepData.json', 'utf8');

//     res.send(JSON.parse(appData)); // can I just do res.json(appData) here?
//   } catch (err) {
//     res.status(500).send({ error: err }); // I thought there was a res.error() method?
//   }
// })

// app.get('/sleep-data', (req, res) => {
//   console.log('GET request received at /sleep-data');
//   res.send({ message: 'GET request received' });
// });

// app.post('/sleep-data', async (req, res) => {
//   const sleepData = req.body;
//   const now = Date.now();
//   const dateKey = moment(now).format('MMM D, YYYY');  // standardize date
//   const logTime = moment(now).format('h:mm:ss a');  // standardize date
//   const db = {};
//   const row = {}

//   row[sleepData.dataType] = logTime;
//   db[dateKey] = row;

//   try {
//     let data;
//     try {
//       data = await fs.readFile('sleepData.json', 'utf8');
//     } catch (err) {
//       if (err.code === 'ENOENT') {
//         // If the file doesn't exist, create it
//         await fs.writeFile('sleepData.json', '{}');
//         data = '{}';
//       } else {
//         throw err; // Rethrow the error so it can be caught in the outer try/catch
//       }
//     }

//     const json = JSON.parse(data);

//     // Use the date as the key in the JSON object
//     if (json[dateKey]) {
//       json[dateKey] = { ...json[dateKey], ...row };
//     } else {
//       json[dateKey] = row;
//     }

//     await fs.writeFile('sleepData.json', JSON.stringify(json));
//     res.send({ message: 'Sleep data updated successfully' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ error: 'Server error' });
//   }
// });
