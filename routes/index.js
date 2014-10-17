var express = require('express');
var model = require('../data/model');
var router = express.Router();

router.get('/', function(req, res) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		res.redirect('/room/' + req.user.room);
	}
});

router.get(new RegExp('room\/(.+)'), function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
   res.render('login');
});

module.exports = router;
