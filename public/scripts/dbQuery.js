const { Pool } = require('pg');
const dbParams = require('../../lib/db');
const db = new Pool(dbParams);
db.connect();

const showAllUsers = function() {
return db.query('SELECT * FROM users')
    .then(res => {
      console.log(res.rows)

    });
};


const checkUserEmail = function(email) {
  return db.query(`SELECT email
  FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0].email)
}

const addUser = function(user) {
db.query(`Insert INTO users(name, email, password)
    VALUES($1, $2, $3)
    returning *;`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => console.log('error'));
};

module.exports = {showAllUsers, checkUserEmail, addUser}
