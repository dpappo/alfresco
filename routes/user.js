const express = require('express');
const router = express.Router();
const app = express();

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

  return router;
};
