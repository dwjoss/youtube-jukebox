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
	if (req.user && (req.user.room.toString() === req.params[0])) {
		res.render('host');
	} else {
		res.render('participant');
	}
});

router.get('/login', function(req, res) {
   res.render('login');
});

router.get('/test', function(req, res) {
   res.render('test');
});

module.exports = router;
