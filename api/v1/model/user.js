const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    updated : {type : Date, default : Date.now()},
	email : {type : String, required : true},
	password :  {type : String, required : true},
	fullName : String,
	imageUrl : String,
});
module.exports = mongoose.model('User',userSchema);
