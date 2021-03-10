// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const widgetsRoutes = require("./routes/widgets");
const user = require("./routes/user");
const login = require("./routes/login_register")



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));




app.use("/api/widgets", widgetsRoutes(db));
app.use('/user', user(db));
app.use('/login', login(db));


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const { checkUserByEmail, showAllUsers, addUser, userLogin, addPoint, getMarkersFromDB} = require('./public/scripts/dbQuery');


app.get("/", async (req, res) => {
  if (req.session.user_id === null) {
    res.redirect("/login")
  } else {
    console.log(req.session.user_id);
    const markers = await getMarkersFromDB();
    const templateVars = { coords: markers,
    current: "home" }
    res.render("index", templateVars)

  }
});


app.post("/logout", (req, res) => {
  //console.log(req.session.user_id);
  req.session.user_id = null;
  res.redirect("/login/");
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
