//Boards.js
var Board = require('../model/board.js');
var httpHelper = require('../util/httpHelper.js');


var boards = {
	getAllNames: function(req, res){
		new Board().findAllNames(function(Board){
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
		var Board = new Board(req.body);
		//need to make sure 
		if(!Board.isValid()){
			console.log("invalid Board parameters");
			httpHelper.badRequest(res);
			return;
		}
		//if the Board is valid then save it
		Board.save(function(Board){
			console.log("Successfully created Board" + Board.BoardName)
			httpHelper.ok(res)
			console.log(res.body)
		});
	},
	update: function(req, res){
		var Board = new Board(req.body);
		if(!Board.isValid()){
			httpHelper.badRequest(res)
			return;
		}
		Board.update(function(updateBoard){
			res.json(Board)
		});
	}
};

 module.exports = boards;
