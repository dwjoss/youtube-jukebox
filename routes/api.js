var express = require('express');
var passport = require('passport');
var model = require('../data/model');
var router = express.Router();

router.post('/join', function(req, res) {

});

router.post('/search', function(req, res) {
	var search = require('youtube-search');
	var opts = {
	  maxResults: 10,
	  startIndex: 1
	};
	search(req.body.query, opts, function(err, results) {
	  if(err) return console.log(err);
	  res.json(results);
	});
});

router.get('/queue/songs', function(req, res) {

});

router.post('/queue/add', function(req, res) {
	
});

router.put('/queue/pop', function(req, res) {

});

router.post('/queue/add', function(req, res) {

});

module.exports = router;
