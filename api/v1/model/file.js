const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    updated : {type : Date, default : Date.now()},
	nameOriginal : String,
	nameServer : String,
	url : String,
	hash : String,
	caption : String
});
module.exports = mongoose.model('File',fileSchema);
