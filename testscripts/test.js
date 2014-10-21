//host login
var roomNumber;

$.post( "localhost:3000/create", 
        { email: "host@gmail.com", 
          name: "host" 
          passowrd: "password" })
        .done(function(data){
            roomNumber = $.parseJSON(data);
        });

//API testing methods
