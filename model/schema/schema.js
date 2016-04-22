//schema.js
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

schemas = {
	board: {
		name : String,
		author: String,
		createdTime: Date,
		todo: [{name:String, description:String, creationDate:Date}],
		doing: [{name:String, description:String, creationDate:Date}],
		done: [{name:String, description:String, creationDate:Date}]
	}
}

module.exports = schemas;