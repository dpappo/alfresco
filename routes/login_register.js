const express = require('express');
const router  = express.Router();


router.get("/login", (req, res) => {
  res.render("log_reg");
});

module.exports = router;
