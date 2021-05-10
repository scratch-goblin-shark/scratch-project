const { Pool } = require('pg');

const PG_URI = 'postgres://ewobuldh:v_gE8Fwm8URxSuIa7mdgposKZ6br9Q6N@queenie.db.elephantsql.com:5432/ewobuldh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
