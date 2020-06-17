const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const menuItems = require('../src/menuItem');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('order', {menuItems: menuItems});
});

module.exports = router;