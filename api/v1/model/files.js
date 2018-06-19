const mongoose = require('mongoose');

const filesSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    updated : {type : Date, default : Date.now},
	name : String,
	url : String,
	hash : String,
});
module.exports = mongoose.model('Files',filesSchema);
