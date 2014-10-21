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
	        console.log('Tested auth/create');
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
	        console.log('Tested api/search');
	        console.log('YouTube search results: ' + msg);
	    }
	});

	// listener Dylan joins the room
	$.ajax({
	    type: 'POST',
	    url: '/api/join',
	    async: false,
	    data: {
	        'room': room,
	        'name': 'Dylan'
	    },
	    success: function(msg) {
	        console.log('Tested api/join');
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
	    url: '/api/join',
	    async: false,
	    data: {
	        'room': room,
	        'name': 'Jason'
	    },
	    success: function(msg) {
	        console.log('Tested api/join');
	        console.log('Logged in users: ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone adds a song "Turn down for what" in the queue
	$.ajax({
	    type: 'POST',
	    url: '/api/queue/add',
	    async: false,
	    data: {
	        'room': room,
	        'song': 'Turn down for what',
	    },
	    success: function(msg) {
	        console.log('Tested api/queue/add');
	        console.log('New song queues ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone adds a song "Get low" in the queue
	$.ajax({
	    type: 'POST',
	    url: '/api/queue/add',
	    async: false,
	    data: {
	        'room': room,
	        'song': 'Get low',
	    },
	    success: function(msg) {
	        console.log('Tested api/queue/add');
	        console.log('New song queues ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// someone reqeusts to see the list of songs in the queue
	$.ajax({
	    type: 'GET',
	    url: '/api/queue/songs',
	    async: false,
	    data: {
	        'room': room
	    },
	    success: function(msg) {
	        console.log('Tested api/queue/songs');
	        console.log('Song queue ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// the first song was popped from the list
	$.ajax({
	    type: 'PUT',
	    url: '/api/queue/pop',
	    async: false,
	    data: {
	        'room': room,
	    },
	    success: function(msg) {
	        console.log('Tested api/queue/pop');
	        console.log('New song queues ' + msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	// listener Dylan leaves the room
	$.ajax({
	    type: 'POST',
	    url: '/api/leave',
	    async: false,
	    data: {
	        'room': room,
	        'name': 'Dylan'
	    },
	    success: function(msg) {
	        console.log('Tested api/leave');
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
	        console.log('Tested auth/logout');
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
	        console.log('Tested auth/login');
	        console.log(msg);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});
	
});
