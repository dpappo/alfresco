const { Pool } = require('pg');
const dbParams = require('../../lib/db');
const db = new Pool(dbParams);
db.connect();
const bcrypt = require('bcrypt');

const showAllUsers = function() {
return db.query('SELECT * FROM users')
    .then(res => {
      console.log(res.rows)

    });
};


const checkUserByEmail = function(email) {
  return db.query(`SELECT *
  FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0])
}

const addUser = function(user) {
db.query(`Insert INTO users(name, email, password)
    VALUES($1, $2, $3)
    returning *;`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => console.log('error'));
};

const userLogin = function(email, password) {
  return checkUserByEmail(email)
  .then(user => {
    if(password === user.password) {
      return user;
    }
    return null;
  });

}

module.exports = {showAllUsers, checkUserByEmail, addUser, userLogin}
