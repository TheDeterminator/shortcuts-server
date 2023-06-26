// import { Pool } from 'pg'
require('dotenv').config();
const { emptyTable, insertInDatabase } = require('../dbUtil');
const { Pool } = require('pg');

 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
   
// export const query = (text, params) => pool.query(text, params); update with babel
query = function(text, params) {
    return pool.query(text, params);
  };


// emptyTable('sleep_data', query)

    // await Promise.all([
        // insertInDatabase('wake_up', './wakeUpTime.txt', query)
        // , 
        // insertInDatabase('go_to_sleep', './goToSleepTimes.txt', query)
    // ])

  

module.exports = { query }