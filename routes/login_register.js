const express = require('express');
const router  = express.Router();
const app = express()

router.get("/login", (req, res) => {
  res.render('log_reg');
});

router.get("/favorites", (req, res) => {
  res.render('my_map');
});

router.get("/profile", (req, res) => {
  res.render('profile');
});


module.exports = router
