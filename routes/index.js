var express = require('express');
var model = require('../data/model');
var router = express.Router();

router.get('/', function(req, res) {
   res.render('index');
});

router.get('/', function(req, res) {
   res.render('login');
});

module.exports = router;
