const express = require('express');
const router  = express.Router();
const app = express()
const { checkUserByEmail, showAllUsers, addUser, login} = require('../public/scripts/dbQuery');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['7f69fa85-caec-4d9c-acd7-eebdccb368d5', 'f13b4d38-41c4-46d3-9ef6-8836d03cd8eb'],
}));


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('log_reg');
  });

  router.post("/register", (req, res) =>{
 const user = req.body
 addUser(user)
  });

  router.post("/log", (req, res) => {
    const {email, password} = req.body;
    login(email, password)
    .then(user => {

      if(!user) {
        res.send({error: "error"});
        return;
      } else {
        //req.session.user_id = user.id;
      res.redirect("/");
      }
    })
    //.catch(e => res.send(e));
  });




   return router;
};






