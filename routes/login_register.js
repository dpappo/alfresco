const express = require('express');
const router  = express.Router();
const app = express()


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('log_reg');
  });

   return router;
};




router.get("/profile", (req, res) => {
  res.render('profile');
});


module.exports = router

