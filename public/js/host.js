var loadNextSong = function(){
	$.ajax({
	    type: 'DELETE',
	    url: '/api/rooms/' + roomID + '/queue/songs',
	    success: function(msg) {
	        loadSongQueue(true);
	    },
	    error: function(req, textStatus, error) {
	        console.log(textStatus);
	        console.log(error);
	    }
	});
}