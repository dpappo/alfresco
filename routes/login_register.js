
const { checkUserByEmail, showAllUsers, addUser, userLogin} = require('../public/scripts/dbQuery');
const express = require('express');
const app = express()
const router  = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('log_reg');
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

  router.post("/register", (req, res) => {
    const user = req.body
    addUser(user)
    req.session.user_id = user.id;
    res.redirect("/");
  });



   return router;
};
