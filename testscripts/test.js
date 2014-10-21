// Host login
var room;

$.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/create',
    async: false,
    data: { 
        email: "host@gmail.com", 
        name: "host", 
        password: "password" 
    },
    success: function(data){
        room = data._id;
        console.log(room);
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
    async: false,
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
    async: false,
    data: {
        'room': room,
        'name': 'Dylan',
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
