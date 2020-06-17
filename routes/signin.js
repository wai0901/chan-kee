const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.render('signin');
});

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.redirect('/order');
});

module.exports = router;