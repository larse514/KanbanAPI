//schema.js
schemas = {
	board: {
		_id : String,
		name : String,
		author: String,
		createdTime: Date,
		todo: [{name:String, description:String, creationDate:Date}],
		doing: [{name:String, description:String, creationDate:Date}],
		done: [{name:String, description:String, creationDate:Date}]
	}
}

module.exports = schemas;