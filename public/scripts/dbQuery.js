const { Pool } = require('pg');
const dbParams = require('../../lib/db');
const db = new Pool(dbParams);
db.connect();
const bcrypt = require('bcrypt');



const showAllUsers = function () {
  return db.query('SELECT * FROM users')
    .then(res => {
      console.log(res.rows)

    });
};


const checkUserByEmail = function (email) {
  return db.query(`SELECT *
  FROM users
ERE email = $1`, [email])
    .then(res => res.rows[0])
};

const addUser = function (user) {
  db.query(`Insert INTO users(name, email, password)
    VALUES($, $2, $3)
    returning *;`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => console.log('error'));
};

const userLogin = function (email, password) {
  return checkUserByEmail(email)
    .then(user => {
      if (password === user.password) {
        return user;
      }
      return null;
    });
};

const addPoint = function (point, userID) {
  db.query(`Insert INTO locations(user_id, description, title, address, phone, image, long, lat)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  returning *;`, [userID, point.description, point.title, point.address, point.phone, point.imageurl, point.long, point.lat])
    .then(res => res.rows[0])
    .catch(err => console.log('error:', err));
}

const getMarkersFromDB = function () {
  return db.query(`SELECT *
  FROM locations;`)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log(err));
}

const getFavoriteMarkers = function (user) {
  return db.query(`SELECT *
  FROM locations
  WHERE user_id = $1;`, [user])
    .then(res => res.rows)
    .catch(err => console.log('error'));
}

/*const displayMarkers = function(locations) {

  console.log(locations);
  for(location of locations) {
    L.marker([location.long, location.lat]).addTo(mymap);
  }
} */



module.exports = { showAllUsers, checkUserByEmail, addUser, userLogin, addPoint, getMarkersFromDB, getFavoriteMarkers}


/*
INSERT INTO locations (user_id, description, title, address, phone, image, long, lat)
VALUES (37, 'asdasdasd', 'asdas', 'asdasd', 'asdasd', 'asdas', 43.0896, -79.0849);

INSERT INTO locations (user_id, description, title, address, phone, image, long, lat)
VALUES (37, 'asdasdaffsd', 'asddffdas', 'asdasX', 'asdasQ', 'asdddas', 49.2827, -123.1207)
*/
