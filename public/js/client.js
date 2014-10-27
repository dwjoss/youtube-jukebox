var isHost;
var roomID;

$(document).ready(function() {
	io = io.connect();
	roomID = window.location.pathname.split('/')[2];
	console.log(roomID);
	
	$('#link input[type=text]').val(window.location);

	if ($('#status').val() == 'host'){
		isHost = true;
	} else {
		isHost = false;
	}
	
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
				// $.each(results, function( index, song ) {
				// 	console.log(song);
					
				// 		HERE IS WHERE YOU HANDLEBAR EACH SONG
				// 		AND INSERT THE RESULTING HTML INTO $('#posts')
					
				// });
				loadSearchResults(results);
		    }
		})
	});

	loadSongQueue();
	
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

$(document).on('click', '.add-button', function(){
	//TODO: construct song object, giving information about the button
	addSong(song);
});

var loadSearchResults = function(results){
	$('#serach-results').html(Handlebars.templates['search-results'](results));
};

var loadSongQueue = function(songs){
	$.ajax({
	    type: 'GET',
	    url: '/api/rooms/' + roomID + '/queue/songs',
	    success: function(songs) {
	        $('#queue').html(Handlebars.templates['queue'](songs));
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});

	if (isHost){
		$('#player').html(Handlebars.templates['player'](songs[0]));
	}
}

var addSong = function(song){
	$.ajax({
	    type: 'POST',
	    url: '/api/rooms/' + room + '/queue/songs',
	    data: song,
	    success: function(response) {
	    	loadSongQueue();
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});
}
