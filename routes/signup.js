const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', (req, res, next) => {
  // res.redirect('/order');
});
  
module.exports = router;