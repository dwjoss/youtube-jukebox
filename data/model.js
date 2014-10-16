var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); // Used for hashing passwords

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
	
var userSchema = new Schema({
    name    	  : String,
    email     	  : String,
	password      : String,
	room          : {type: ObjectId, ref: 'Room'}
}); 

userSchema.methods.validPassword = function validPassword(password) {
	if (bcrypt.compareSync(password, this.password)) {
		return true;
	}
	return false;
}

var roomSchema = new Schema({
	listeners : [{ type: ObjectId, ref: 'User' }],
    url  	  : String,
    queue     : []
}); 

var Room = mongoose.model('Room', roomSchema);
var User = mongoose.model('User', userSchema);

exports.Room = Room;
exports.User = User;