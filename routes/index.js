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
	var room = req.params[0];
	if (req.user && (req.user.room.toString() === room)) {
		res.render('host', {user: req.user.name});
	} else {
		res.render('participant');
	}
});

router.get('/login', function(req, res) {
   res.render('login');
});

router.get('/debug',function(req,res){
	res.render('debug');
})

router.get('/test', function(req, res) {
   res.render('test');
});

module.exports = router;
