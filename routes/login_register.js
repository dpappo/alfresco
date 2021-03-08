
const { checkUserByEmail, showAllUsers, addUser, userLogin} = require('../public/scripts/dbQuery');
const express = require('express');
const app = express()
const router  = express.Router();


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('log_reg');
  });

  /*router.post("/register", (req, res) =>{
 const user = req.body
 addUser(user)
  }); */

  /*router.post("/log", (req, res) => {
    const {email, password} = req.body;

    userLogin(email, password)
    .then(user => {

      if(!user) {
        res.send({error: "error"});
        return;
      }
console.log(user.id);
console.log(req.s)

req.session.user_id = req.body.id
     res.redirect("/");

    })
    //.catch(e => res.send(e));
  }); */

   return router;
};






