const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = (db) => {
  router.get("/points", (req, res) => {
    res.render('my_points');
  });

  router.get("/favorites", (req, res) => {
    res.render('my_map');
  });

  router.get("/profile", (req, res) => {
    res.render('profile');
  });

  router.get("/addpoint", (req, res) => {
    res.render('addpoint');
  });

  router.post("/addpoint", (req, res) => {
    console.log('Body Info:', req.body);
    res.sendStatus(200);
  })


  return router;
};
