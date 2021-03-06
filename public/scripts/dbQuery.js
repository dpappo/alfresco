const { Pool } = require('pg');
const dbParams = require('../../lib/db');
const db = new Pool(dbParams);
db.connect();
const bcrypt = require('bcrypt');
const saltRounds = 10;




const showAllUsers = function () {
  return db.query('SELECT * FROM users')
    .then(res => {
      console.log(res.rows)

    });
};

const getUserByID = function(ID) {
  return db.query(`SELECT name, email
  FROM users
  WHERE id = $1`, [ID])
  .then(res => res.rows[0])
  .catch(err => console.log('get user by id error'))
};


const checkUserByEmail = function (email) {
  return db.query(`SELECT *
  FROM users
  WHERE email = $1`, [email])
    .then(res => res.rows[0])
};

const addUser = function (user) {
  db.query(`Insert INTO users(name, email, password)
    VALUES($1, $2, $3)
    returning *;`, [user.name, user.email, bcrypt.hashSync(user.password, saltRounds)])
    .then(res => res.rows[0])
    .catch(err => console.log('error'));
};

const userLogin = function (email, password) {
  return checkUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
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

const addFavorite = function (point, userID) {
  db.query(`Insert INTO favorites(user_id, locations_id)
  VALUES($1, $2)
  returning *;`, [userID, point])
    .then(res => res.rows[0])
    .catch(err => console.log('error:', err));
}

const removeFavorite = function (point, userID) {
  console.log("in remove favorite")
  db.query(`DELETE FROM favorites WHERE
  user_id = $1 AND locations_id = $2
  returning *;`, [userID, point])
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

const getFavoriteMarkers = function(user) {
  return db.query(`SELECT *
  FROM locations
  JOIN favorites ON locations.id = locations_id
  WHERE favorites.user_id = $1;`, [user])
    .then(res => res.rows)
    .catch(err => console.log('error'));
}

const getMyMarkers = function(user) {
  return db.query(`SELECT locations.*
  FROM locations
  JOIN users ON users.id = locations.user_id
  WHERE users.id = $1;`, [user])
    .then(res => res.rows)
    .catch(err => console.log('error'));
}

const getLocationById = function(location) {
  return db.query(`SELECT  *
  FROM locations
  WHERE locations.id= $1`, [location])
    .then(res => res.rows)
    .catch(err => console.log('error'));
}

const editPoint = function (point, pointID) {
  db.query(`UPDATE locations
  SET description = $1
  ,title = $2
  ,address = $3
  ,phone = $4
  ,image = $5
  ,long = $6
  ,lat = $7
  WHERE locations.id = $8;`, [point.description, point.title, point.address, point.phone, point.imageurl, point.long, point.lat, pointID])
    .then(res => res.rows[0])
    .catch(err => console.log('error:', err));
}

const deletePoint = function (point, userID) {
  console.log("in delete function")
  console.log("point:", point)
  console.log("userID:", userID)
  return db.query(`DELETE FROM locations
  WHERE
  user_id = $1 AND id = $2
  returning *;`, [userID, point])
    .then(res => res.rows[0])
    .catch(err => console.log('error:', err));
}







module.exports = { showAllUsers, checkUserByEmail, addUser, userLogin, addPoint, addFavorite, removeFavorite, getMarkersFromDB, getFavoriteMarkers, getMyMarkers, getLocationById, editPoint, deletePoint, getUserByID}


/*
users

INSERT INTO users (name, email, password)
VALUES ('Adam', 'adam@gamil.com', 'test'),
       ('Dan', 'dan@dan.com', 'test2'),
       ('Jesse', 'jesse@jesse.com', 'test3'),
       ('Christian', 'lost@lost.com', 'test4'),
       ('Gary', 'gary@gary.com', 'test5');


locations

INSERT INTO locations (user_id, description, title, address, phone, image, long, lat)
VALUES (37, 'asdasdaffsd', 'asddffdas', 'asdasX', 'asdasQ', 'asdddas', 49.2827, -123.1207)

INSERT INTO favorites (user_id, locations_id)
VALUES(13, 5);

SELECT *
  FROM locations
  JOIN favorites ON locations.id = locations_id
  WHERE favorites.user_id = 13;


  SELECT locations.*
  FROM locations
  JOIN users ON users.id = user_id
  WHERE users.id = 1;

UPDATE locations
  SET description = 'update test'
   ,title = 'Updoot'
   ,address = '123 test st'
   ,phone = 'Doot Phhone'
   ,image = 'imgTEST.jpg'
   ,long = 64.8255
   ,lat = -124.8457
  WHERE locations.id = 4;

*/
