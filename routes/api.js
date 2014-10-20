/*
REST API for YouTube Jukebox
All server and database interaction described below
*/

var express = require('express');
var passport = require('passport');
var model = require('../data/model');
var router = express.Router();

/* POST Search Query -> Fetch Videos -> return Array of YouTube Video Objects || 500 if search fails
   INPUT PARAMS: query
*/
router.post('/search', function(req, res) {
	var search = require('youtube-search');
	var opts = {
	  maxResults: 10,
	  startIndex: 1
	};
	search(req.body.query, opts, function(err, results) {
	  if(err) return res.status(500).json({message:'Unable to fetch results from YouTube.'});
	  res.json(results);
	});
});

/* POST Join Request -> Add User to Room -> Broadcast Socket Event of New Join -> return Array of Users in Room || 500 if server error
   INPUT PARAMS: room, name
*/
router.post('/join', function(req, res) {
    model.Room.findByIdAndUpdate(
        req.body.roomID, 
        {$push: {listeners: req.body.name}},
        function(err, room) {
            if (err) {
                return res.status(500).json({error: 'There was an error joining the room.'});
            }
            if (!room) {
                return res.status(404).json({error: 'The room requested was not found.'});
            }
            res.json(room.listeners);
        }
    );
});

/* POST Leave Request -> Remove User From Room -> Broadcast Socket Event of Left User -> return 200
   INPUT PARAMS: room, name
*/
router.post('/leave', function(req, res) {

});

/* GET Song Queue Request -> Fetch Queue for Room -> return Array of YouTube Video Objects on Queue for room
   INPUT PARAMS: room
*/
router.get('/queue/songs', function(req, res) {
	model.Room.findById(req.body.room, function(err, room){
		res.json(room.queue);
	})
});

/* POST YouTube Video Object -> Add object to room queue -> Broadcast Socket Event of New Song -> return Array of YouTube Video Objects on Queue for room
   INPUT PARAMS: room, song
*/
router.post('/queue/add', function(req, res) {
	model.Room.findByIdAndUpdate(
		req.body.room,
		{$push: {queue: req.body.song}},
		function(err,room){
			if (err) {
                return res.status(500).json({error: 'There was an error addding song to the queue.'});
            }
            if (!room) {
                return res.status(404).json({error: 'The room requested was not found.'});
            }
            res.json(room.queue);
		}
	);
	
});

/* POST Room to Pop Song From -> Pop Song off Queue -> Broadcast Socket Event of New Song -> return Array of YouTube Video Objects on Queue for room || 401 if not logged in
   INPUT PARAMS: room
*/
router.put('/queue/pop', function(req, res) {
	if (req.user) {
		model.Room.findByIdAndUpdate(
		req.body.room,
		{$pull: {queue: req.body.song}},
		function(err,room){
			if (err) {
                return res.status(500).json({error: 'There was an error poping song off the queue.'});
            }
            if (!room) {
                return res.status(404).json({error: 'The room requested was not found.'});
            }
            res.json(room.queue);
		}
	);
	} else {
		res.status(401);
	}

});

module.exports = router;
