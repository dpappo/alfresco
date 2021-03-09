const express = require('express');
const router = express.Router();
const app = express();
const { addPoint, addFavorite } = require('../public/scripts/dbQuery');




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

  router.get("/mypoint", (req, res) => {
    res.render("my_points");
  })

   router.post("/addpoint", (req, res) => {
    const point = req.body;
    const user = req.session.user_id;
    addPoint(point, user);
    res.redirect("/");

  })

  router.post("/favorite", (req, res) => {
    const point = req.body.locations_id;
    // console.log("point: ", point)
    const user = req.session.user_id;
    addFavorite(point, user);
    res.redirect("/");

  })




  return router;
};
