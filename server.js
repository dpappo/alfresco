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
const usersRoutes = require("./routes/users");
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



app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use('/user', user(db));
app.use('/login', login(db));


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const { checkUserByEmail, showAllUsers, addUser, userLogin, addPoint } = require('./public/scripts/dbQuery');

app.get("/", (req, res) => {
  if (req.session.user_id === null) {
    res.redirect("/login")
  } else {
    res.render("index");
  }
});

app.post("/logout", (req, res) => {
  console.log(req.session.user_id);
  req.session.user_id = null;
  res.redirect("/login/");
});

/* app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

app.post("/login/log", (req, res) => {
  const { email, password } = req.body;

  userLogin(email, password)
    .then(user => {

      if (!user) {
        res.send({ error: "error" });
        return;
      }
      console.log(user.id);
      req.session.user_id = user.id;
      console.log(req.session.user_id);
      res.redirect("/");

    })
    .catch(e => res.send(e));
});

app.post("/login/register", (req, res) => {
  const user = req.body
  addUser(user)
  req.session.user_id = user.id
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  console.log(req.session.user_id);
  req.session.user_id = null;
  res.redirect("/login/");
});


/*app.post("/user/addpoint", (req, res) => {
  console.log('Body Info:', req.body)
  const point = req.body;
  const user = req.session.user_id;
  addPoint(point, user);
}); */



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
