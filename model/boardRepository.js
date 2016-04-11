// grab the things we need
//TODO-Refactor into a repository class since mboard doesn't make sense
var mongoose = require('mongoose');
//set default db values
var db_name = 'board_unit_test';
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//this is openshifts way of accessing environemtn variables
//This will probably have to be set ya dingus
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);
var Schema = mongoose.Schema;

// create a schema
var boardSchema = new Schema({
	name : String,
	author: String,
	createdTime: Date,
	todo: [{name:String, description:String, creationDate:Date}],
	doing: [{name:String, description:String, creationDate:Date}],
	done: [{name:String, description:String, creationDate:Date}]
});

// the schema is useless so far
// we need to create a model using it
var board = mongoose.model('board', boardSchema);

// make this available to our boards in our Node applications
module.exports = board;