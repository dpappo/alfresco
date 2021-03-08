const express = require('express');
const router  = express.Router();
const app = express()
const { checkUserEmail, showAllUsers, addUser} = require('../public/scripts/dbQuery');



module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('log_reg');
  });

  router.post("/register", (req, res) =>{
 const user = req.body
 addUser(user)
  });




   return router;
};






