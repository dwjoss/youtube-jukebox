/*
AJAX Tests for YouTube Jukebox API
*/

$(document).ready(function() {
	// Testing Room Creation

	// create dummy user account
	var room;

	$.ajax({
	    type: 'POST',
	    url: '/auth/create',
	    async: false,
	    data: { 
	        email: "host@gmail.com", 
	        name: "host", 
	        password: "password" 
	    },
	    success: function(data){
	        room = data._id;
	        console.log('Tested POST auth/create');
	        console.log('Host created room ' + room);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});


	// Testing API Methods

	// search for YouTube videos that match the query 'MIT'
	$.ajax({
	    type: 'POST',
	    url: '/api/search',
	    async: false,
	    data: { 
	        'query': 'MIT', 
	    },
	    success: function(msg){
	        console.log('Tested POST api/search');
	        console.log('YouTube search results: ' + msg["search-results"]);
	        
            for (var i = 0; i < msg["search-results"].length; i++) {
                console.log(msg["search-results"][i]);
            }
        
        }
	});

	// listener Dylan joins the room
	$.ajax({
	    type: 'POST',
	    url: '/api/rooms/' + room + '/users',
	    async: false,
	    data: {
	        'name': 'Dylan'
	    },
	    success: function(msg) {
	        console.log('Tested POST api/rooms/:room/users');
	        console.log('Logged in users: ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// listener Jason joins the room
	$.ajax({
	    type: 'POST',
	    url: '/api/rooms/' + room + '/users',
	    async: false,
	    data: {
	        'name': 'Jason'
	    },
	    success: function(msg) {
	        console.log('Tested POST api/rooms/:room/users');
	        console.log('Logged in users: ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone adds a song "Turn Down For What" in the queue
	$.ajax({
	    type: 'POST',
	    url: '/api/rooms/' + room + '/queue/songs',
	    async: false,
	    data: {
	        'song': 'Turn Down For What',
	    },
	    success: function(msg) {
	        console.log('Tested POST api/queue/add');
	        console.log('New song queue ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone adds a song "Get Low" in the queue
	$.ajax({
	    type: 'POST',
	    url: '/api/rooms/' + room + '/queue/songs',
	    async: false,
	    data: {
	        'song': 'Get Low',
	    },
	    success: function(msg) {
	        console.log('Tested POST api/queue/add');
	        console.log('New song queue ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone requests to see the list of songs in the queue
	$.ajax({
	    type: 'GET',
	    url: '/api/rooms/' + room + '/queue/songs',
	    async: false,
	    success: function(msg) {
	        console.log('Tested GET api/rooms/:room/queue/songs');
	        console.log('Song queue ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// the first song was popped from the list
	$.ajax({
	    type: 'DELETE',
	    url: '/api/rooms/' + room + '/queue/songs',
	    async: false,
	    success: function(msg) {
	        console.log('Tested DELETE api/rooms/:room/queue/songs');
	        console.log('New song queues ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// listener Dylan leaves the room
	$.ajax({
	    type: 'DELETE',
	    url: '/api/rooms/' + room +'/users/Dylan',
	    async: false,
	    success: function(msg) {
	        console.log('Tested DELETE api/rooms/:room/users/:name');
	        console.log(msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// Host logs out
	$.ajax({
	    type: 'GET',
	    url: '/auth/logout',
	    async: false,
	    success: function(msg) {
	        console.log('Tested POST auth/logout');
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// Host logs back in
	$.ajax({
	    type: 'POST',
	    url: '/auth/login',
	    async: false,
	    data: {
	        'email': 'host@gmail.com',
	        'password': 'password'
	    },
	    success: function(msg) {
	        console.log('Tested POST auth/login');
	        console.log(msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});
	
});
