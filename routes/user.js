const express = require('express');
const router = express.Router();
const app = express();
const { addPoint } = require('../public/scripts/dbQuery');




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
    console.log('Body Info:', req.body)
    console.log(req.session);
    const point = req.body;
    const user = req.session.user_id;
    addPoint(point, user);

  })




  return router;
};
