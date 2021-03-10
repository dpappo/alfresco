
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
          res.send({ error: "error" });
          return;
        }
        console.log(user.id);
        req.session.user_id = user.id;
        console.log(req.session.user_id);
        res.redirect("/");

      })
      .catch(e => res.send(e));
  });

  router.get("/register", (req, res) => {
    if(req.session.user_id !== null) {
      res.redirect("/");
    } else {
    res.render("register");
    }
  });

  router.post("/register", (req, res) => {
    const user = req.body
    addUser(user)
    res.redirect("/login");
  });



   return router;
};
