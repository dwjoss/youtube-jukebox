var express = require('express');
var model = require('../data/model');
var router = express.Router();

/* A middleware function that checks if the user is authenticated to access the API */
router.use(function (req, res, next) {
	if (req.cookies.sessionToken == undefined) {
		res.status(403).json({ error: 'Please login before using the API.' });
	} else { 
		model.User.where({ "sessionToken": req.cookies.sessionToken }).findOne(function(err, doc) {
			if (err) {
				res.status(403).json({ error: 'Your session seems to be invalid.' });
			} else {
				req.user = doc;
				next();
			}
		});
	}
});

/* GET Feed For This Users. */
router.get('/feed', function(req, res) {
	model.User.where({ _id: req.user._id }).findOne(function(err, doc) {
		if (err) {
			res.status(500).json({ error: 'There was an error following that user.' });
		} else {
			model.Post.find({ user : { $in : doc.following }}).populate('user').exec(function(err, docs) {
				if (err) {
					res.status(500).json({ error: 'Error getting feed from DB.' });
				} else {
					res.json({user: req.user, posts: docs});
				}
			});
		}
	});
});

/* POST a New Post. */
router.post('/post', function(req, res) {
	var newPost = new model.Post({ "user": req.user._id, "text": req.body.text })
	newPost.save(function(err, doc) {
		if (err) {
			res.status(500).json({ error: 'There was an error posting.' });
		} else {
			model.Post.findOne({_id: doc.id}).populate('user').exec(function(err,post) {
				res.json(post);
			});
		}
	});
});

/* PUT an Edit to a Post. */
router.put('/edit', function(req, res) {
	model.Post.where({ _id: req.body.id }).findOneAndUpdate({ $set: {text: req.body.text} }, 
		function(err, doc) {
		if (err) {
			res.status(500).json({ error: 'There was an error updating the post.' });
		} else {
			res.json(doc);
		}
	});
});

/* DELETE a Post */
router.delete('/delete', function(req, res) {
	model.Post.where({ _id: req.body.id }).findOneAndRemove(function(err) {
		if (err) {
			res.status(500).json({ error: 'There was an error deleting the post.' });
		} else {
			res.json({message: "Tweet successfully deleted."})
		}
	});
});

/* PUT a New Favorite Post */
router.put('/favorite', function(req, res) {
	model.User.where({ _id: req.user._id }).findOneAndUpdate({ $addToSet: {favorites: req.body.id} }, 
		function(err, doc) {
		if (err) {
			res.status(500).json({ error: 'There was an error favoriting the post.' });
		} else {
			res.json(doc);
		}
	});
});

/* GET a List of Favorite Posts  */
router.get('/favorites', function(req, res) {
	model.User.where({ _id: req.user._id }).populate('favorites').findOne(function(err, docs) {
	    var options = {
	      path: 'favorites.user',
	      model: 'User'
	    };
		if (err) {
			res.status(500).json({ error: 'There was an error getting the favorites: ' + err });
		} else {
		    model.User.populate(docs, options, function (err, favs) {
		      res.json({user: req.user, posts: favs.favorites});
		    });
	    }
	});
});

/* GET a List of Users  */
router.get('/users', function(req, res) {
	model.User.find(function(err, docs) {
		if (err) {
			res.status(500).json({ error: 'Error getting users from DB.' });
		} else {
			res.json({user: req.user, users: docs});
		}
	});
});

/* POST a new Follower Request  */
router.post('/follow', function(req, res) {
	model.User.where({ _id: req.user._id }).findOneAndUpdate({ $addToSet: {following: req.body.id} }, 
		function(err, doc) {
		if (err) {
			res.status(500).json({ error: 'There was an error following that user.' });
		} else {
			res.json(doc);
		}
	});
});

module.exports = router;
