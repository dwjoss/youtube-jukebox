// Host login
var roomNumber;

$.ajax({
    type: 'POST',
    dataType: 'jsonp',
    url: 'http://localhost:3000/auth/create',
    data: { 
        email: "host@gmail.com", 
        name: "host", 
        passowrd: "password" 
    },
    success: function(msg){
        roomNumber = $.parseJSON(data);
        console.log(roomNumber);
    },
    error: function(req, textStatus, error) {
        console.log(textStatus);
        console.log(error);
    }
});


// Testing API Methods

$.ajax({
    type: 'POST',
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
    url: 'http://localhost:3000/api/join',
    data: {
        'roomNumber': 123
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
