
const { checkUserByEmail, showAllUsers, addUser, userLogin} = require('../public/scripts/dbQuery');
const express = require('express');
const app = express()
const router  = express.Router();
module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log(req.session.user_id);
    if(req.session.user_id !== null) {
      res.redirect("/");
    } else {
    res.render('log_reg');
    }
  });

  router.post("/log", (req, res) => {
    const { email, password } = req.body;


    userLogin(email, password)
      .then(user => {

        if (!user) {
          res.render("error", {
            status: 400,
            message: 'This Email or Password is Incorrect... Please Try Again.'
          });
          return;
        }
        console.log(user.id);
        req.session.user_id = user.id;
        console.log(req.session.user_id);
        res.redirect("/");

      })

      .catch(e => res.render("error", {
        status: 400,
        message: 'This Email or Password is Incorrect... Please Try Again.'
      }));
  });

  router.get("/register", (req, res) => {
    if(req.session.user_id !== null) {
      res.redirect("/");
    } else {
    res.render("register");
    }
  });

  router.post("/register", async (req, res) => {
    const userAttempt = await checkUserByEmail(req.body.email)
    if (userAttempt === undefined) {
      const user = req.body
      addUser(user)
      res.redirect("/login");
    } else {
      res.render('error', {
        status: 418,
        message: 'This Email is Already in Our System. The server refuses the attempt to brew coffee with a teapot.'
      });
    }
  });

   return router;
};
