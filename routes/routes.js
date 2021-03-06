const express = require('express');
const router  = express.Router();
const app = express();

router.get("/login", (req, res) => {
  res.render('log_reg');
});

router.get("/user/points", (req, res) => {
  res.render('my_points');
});

router.get("/user/favorites", (req, res) => {
  res.render('my_map');
});

router.get("/user/profile", (req, res) => {
  res.render('profile');
});



module.exports = router
