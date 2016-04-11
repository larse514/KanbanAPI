// Retrieve
var MongoClient = require('mongodb').MongoClient;
var db_name = 'board_unit_test';
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
// Connect to the db
var setup = function(){
	MongoClient.connect(mongodb_connection_string, function(err, db) {
		if(err) { return console.dir(err); }
		db.collection('boards').insert({
		name : "TestBoard",
			author: "UnittestGuy",
			createdTime: new Date(),
			todo: [{name:"nuasdll", description:"nusdfgll", creationDate:new Date()}],
			doing: [{name:"nasdfull", description:"nuwretll", creationDate:new Date()}],
			done: [{name:"nulasdfl", description:"nuwertll", creationDate:new Date()}]
		})
	});
}

module.exports = {setup:setup}