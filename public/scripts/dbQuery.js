const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const showAllUsers = function() {
return pool.query('SELECT * FROM users')
    .then(res => {
      console.log(res.rows)
      return res.rows[0];
    });
};
exports.showAllUsers = showAllUsers;
