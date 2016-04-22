//Boards.js
var Board = require('../model/board.js');
var httpHelper = require('../util/httpHelper.js');


var boards = {
	getById: function(req, res){
		var id = req.query;
		new Board().findById(id, function(returnedBoard){
			res.json(returnedBoard);
		})
	},
	getAllNames: function(req, res){
		new Board().findBoardNames(function(Board){
			res.json(Board);
		})
	},
	getByName: function(req, res){
		var board = new Board(req.query);
		//since this is a get by name need to make sure name is set correctly
		if(board.get('name') == null){
			httpHelper.badRequest(res);
			return;
		}
		board.findByBoardName(board.get('name'), function(returnedBoard){
			res.json(returnedBoard);
		})
	},
	create: function(req, res){
		console.log(req.body)
		var board = new Board(req.body);
		//need to make sure 
		if(!board.isValid()){
			console.log("invalid Board parameters");
			httpHelper.badRequest(res);
			return;
		}
		//if the Board is valid then save it
		board.save(function(Board){
			httpHelper.ok(res)
			console.log(res.body)
		});
	},
	update: function(req, res){
		var board = new Board(req.body);
		if(!board.isValid()){
			httpHelper.badRequest(res)
			return;
		}
		board.update(function(updateBoard){
			httpHelper.ok(res)
		});
	}
};

 module.exports = boards;
