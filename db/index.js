// import { Pool } from 'pg' TODO: Update with babel
require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

// export const query = (text, params) => pool.query(text, params); update with babel
/* TODO: Add the logging per the node-postgres guide 
here https://node-postgres.com/guides/project-structure would also be beneficial 
to look at notes on Function call, apply, 
bind here: https://www.one-tab.com/page/MkJ5KJMoRy6tUDD7UoaIQg */
query = function (text, params) {
  return pool.query(text, params);
};



module.exports = { query }