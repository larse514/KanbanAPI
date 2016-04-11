//schema.js
schemas = {
	board: {
		_id : null,
		name : null,
		author: null,
		createdTime: null,
		todo: [{name:null, description:null, creationDate:null}],
		doing: [{name:null, description:null, creationDate:null}],
		done: [{name:null, description:null, creationDate:null}]
	}
}

module.exports = schemas;