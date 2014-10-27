var loadNextSong = function(){
	$.ajax({
	    type: 'DELETE',
	    url: '/api/rooms/' + roomID + '/queue/songs',
	    success: function(response) {
	        loadSongQueue(true);
	    }
	});
}