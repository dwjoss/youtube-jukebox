/*
REST API for YouTube Jukebox
All server and database interaction described below
*/

var express = require('express');
var passport = require('passport');
var model = require('../data/model');
var router = express.Router();

/*
   Parse the room id out of the url
*/
router.param('room', function(req, res, next, roomId) {
  model.Room.findOne({
    _id: roomId
  }, function(err, room) {
    if (room) {
      req.room = room;
      next();
    } else {
      return res.status(404).json({error: 'The room requested was not found.'});
    }
  });
});

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
   INPUT PARAMS: name
*/
router.post('/rooms/:room/users', function(req, res) {
    model.Room.findByIdAndUpdate(
        req.room._id,
        {$push: {listeners: req.body.name}},
        function(err, room) {
            if (err) {
                return res.status(500).json({error: 'There was an error joining the room.'});
            }
            if (!room) {
                console.log("room not found");
                return res.status(404).json({error: 'The room requested was not found.'});
            }
            //req.io.join(req.body.room);
            //app.io.room(req.body.room).broadcast('announce', {message: req.body.name + 'just joined room ' + req.body.room});
            console.log(room);
            console.log(room.listeners);
            res.json(room.listeners);
        }
    );
});

/* DELETE Request -> Remove User From Room -> Broadcast Socket Event of Left User -> return 200
*/
router.delete('/rooms/:room/users/:name', function(req, res) {
    var name = req.params.name;
    model.Room.findByIdAndUpdate(
        req.room._id,  
        {$pull: {listeners: name}},
        function(err, room) {
            if (err) {
                return res.status(500).json({error: 'There was an error leaving the room.'});
            }
            if (!room) {
                return res.status(404).json({error: 'The room requested was not found.'});
            }
            //req.io.leave(req.body.room);
            //app.io.room(req.body.room).broadcast('announce', {message: req.body.name + 'just left room ' + req.body.room});
            
            return res.status(200).json({message: name + ' just left room ' + req.room._id});
        }
    );
});

/* GET Song Queue Request -> Fetch Queue for Room -> return Array of YouTube Video Objects on Queue for room
*/
router.get('/rooms/:room/queue/songs', function(req, res) {
	res.json(req.room.queue);
});

/* POST YouTube Video Object -> Add object to room queue -> Broadcast Socket Event of New Song -> return Array of YouTube Video Objects on Queue for room
   INPUT PARAMS: song
*/
router.post('/rooms/:room/queue/songs', function(req, res) {
	model.Room.findByIdAndUpdate(
		req.room._id,
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

/* PUT Room to Pop Song From -> Pop Song off Queue -> Broadcast Socket Event of New Song -> return Array of YouTube Video Objects on Queue for room || 401 if not logged in
   INPUT PARAMS: room
*/

router.delete('/rooms/:room/queue/songs', function(req, res) {
	if (req.user) {
        model.Room.findByIdAndUpdate(
            req.room._id,
            {$pull: {queue: req.room.queue[0]}},
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
