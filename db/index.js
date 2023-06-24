// import { Pool } from 'pg'
require('dotenv').config();


const { Pool } = require('pg')
 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
   
// export const query = (text, params) => pool.query(text, params); update with babel
exports.query = function(text, params) {
    return pool.query(text, params);
  };
  