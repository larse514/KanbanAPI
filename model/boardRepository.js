// grab the things we need
//TODO-Refactor into a repository class since mboard doesn't make sense
var mongoose = require('mongoose');
var schema = require('./schema/schema.js').board;
//set default db values
var db_name = 'boards_db';
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//this is openshifts way of accessing environemtn variables
//This will probably have to be set ya dingus
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);
var Schema = mongoose.Schema;

// the schema is useless so far
// we need to create a model using it
var board = mongoose.model('board', schema);

// make this available to our boards in our Node applications
module.exports = board;