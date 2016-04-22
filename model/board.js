//dependencies
var schemas = require('./schema/schema.js');
var _ = require('lodash');
var boardRepository = require('./boardRepository.js');
var mongoose = require('mongoose');

//Define "constructor"
var board = function(data){
	this.data = this.sanitize(data);
};
//define data for easy saving into backend
board.prototype.data = {};

//Define generic setter and getter
board.prototype.set = function (name, value) {
	this.data[name] = value;
};

board.prototype.get = function (name){
	return this.data[name];
};

board.prototype.findBoardNames = function(next){
	// get all the boards
	boardRepository.find({},{name:1}, function(err, boards) {
		if (err) throw err;
		// object of all the boards
		next(boards)
	});
};
//probably refactor these into db class
//db methods
board.prototype.findById = function (id, next){
	boardRepository.findById(id, function(err, board) {
		if (err) throw err;
		// show the one board
		next(board)
	});
};
board.prototype.findByBoardName = function(name, next){
	// get all the boards
	boardRepository.find({name : name}, function(err, board) {
		if (err) throw err;
		// object of all the boards
		next(board)
	});
};
board.prototype.save = function (next){
	var newboard = new boardRepository(this.data);
	//set created timestamp
	if(!newboard.createdTime){
		newboard.createdTime = new Date();
	}
	console.log(newboard)
	newboard.save(function(err, board) {
		if (err) throw err;
		next(board);
	});
};
board.prototype.update = function(next){

	var id = this.data.id;
	boardRepository.findByIdAndUpdate(id, this.data,{upsert: true, new:true}, function(err, board){
		if (err) throw err;
		//this returns the object in mongo object in db before update?
		next(board)
	});
};
//Method for testing to close connection
//TODO-Don't like this approach, should consider
//other methods
board.prototype.cleanUp = function(){
	boardRepository.db.close();
};

//helper methods
board.prototype.sanitize = function (data){
	//if data is invalid set to empty object so we don't pull 
	//bad errors, seems smrt
	data = data || {};
	//grab board schema
	schema = schemas.board
	//so let's see...
	//these are using lodash functions (more info found here: https://lodash.com/)
	//_.defaults will add any variables, from schema, that data doesn't contain
	//_.keys gets all the keys from schema and _.pick only keeps these values
	var val =  _.pick(_.defaults(data, schema), _.keys(schema));
	return val;
};
board.prototype.isValid = function(){
	//The Fancy way
//	 _.filter(this.data, function(n){return !_.isNull(n)}).length > 0 ? true : false
	//hand rolled way
	if(this.data){
		//lets just check name and password for now
		if(this.data.name && this.data.author){
			return true;
		}
	}
	return false;
};


module.exports = board;