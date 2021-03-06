const express = require('express');
const router  = express.Router();
const app = express()


module.exports = () => { app.get("/login", (req, res) => {
  res.render("log_reg");
});
};

