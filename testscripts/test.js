// Host login


// Testing API Methods

$.ajax({
    type: 'POST',
    dataType: 'jsonp',
    url: 'http://localhost:3000/api/search',
    data: { 
        'query': 'MIT', 
    },
    success: function(msg){
        console.log('Tested api/search');
        console.log('YouTube search results: ' + msg);
    }
});

$.ajax({
    type: 'POST',
    dataType: 'jsonp',
    url: 'http://localhost:3000/api/join',
    data: {
        'roomNumber': 123
    },
    success: function(msg) {
        console.log('Tested api/join');
        console.log('Logged in users: ' + msg);
    }
});
