const mongoose = require('mongoose');
    Schema = mongoose.Schema;

// User
const UserSchema = new Schema({
    //_id:{type: String, unique: true},
    username: {type: String, unique: true},
	email: {type: String, unique: true},
	hashed_password: String,
    date: Date
});

;
const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;