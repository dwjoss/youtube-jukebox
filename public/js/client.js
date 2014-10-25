$(document).ready(function() {
	io = io.connect();
	var roomID = window.location.pathname.split('/')[2];
	
	$('#link input[type=text]').val(window.location);
	
	// Listen for the new user event.
	io.on('users', function(data) {
		if (data.room === roomID) {
			console.log('Users in room: ' + data);
		}
	})
	
	// Listen for the new song event.
	io.on('addsong', function(data) {
		if (data.room === roomID) {
	    	console.log('Add song: ' + data);
		}
	})
	
	// Listen for song pop events.
	io.on('popsong', function(data) {
		if (data.room === roomID) {
	   		console.log('Pop song: ' + data);
		}
	})

});
