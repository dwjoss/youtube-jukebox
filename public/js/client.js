$(document).ready(function() {
	io = io.connect();
	var roomID = window.location.pathname.split('/')[2];
	
	$('#link input[type=text]').val(window.location);
	
	$('#youtube-search').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
	
	$('#youtube-search').bind("enterKey",function(e) {
		var query = $(this).val();
		$.ajax({
		    type: 'POST',
		    url: '/api/search',
		    data: { 
		        'query': query, 
		    },
		    success: function(results){
				$.each(results, function( index, song ) {
					console.log(song);
					/*
						HERE IS WHERE YOU HANDLEBAR EACH SONG
						AND INSERT THE RESULTING HTML INTO $('#posts')
					*/
				});
		    }
		})
	});
	
	function updateListenerList(listeners) {
		var userString = "";
		$.each(listeners, function( index, user ) {
			userString = userString + user + ", ";
		});
		userString = userString.substring(0, userString.length - 2);
		$('#listeners').text(userString);
	}
	
	// Listen for the new user event.
	io.on('users', function(data) {
		if (data.room === roomID) {
			updateListenerList(data.listeners)
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
