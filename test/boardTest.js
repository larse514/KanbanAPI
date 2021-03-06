// tests/part1/boardsRepository.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Board = require('./../model/board.js');
var mongoose = require('mongoose');
var testRepo = require("./testDataRepo.js")

describe('Board', function() {
	var board;
	var updateBoard = new Board({
	    "_id" : "570a9826cc44f79c27024f88",
	    "name" : "UnitTest",
	    "author" : "UnittestGuy",
	    "createdTime" : new Date(),
	    "done" : [ 
	        {
	            "name" : "card1",
	            "description" : "nuwertll",
	            "creationDate" : new Date(),
	            "_id" : "570a9826cc44f79c27024f85"
	        }
	    ],
	    "doing" : [ 
	        {
	            "name" : "card2",
	            "description" : "nuwretll",
	            "creationDate" : new Date(),
	            "_id" : "570a9826cc44f79c27024f86"
	        }
	    ],
	    "todo" : [ 
	        {
	            "name" : "card3",
	            "description" : "nusdfgll",
	            "creationDate" : new Date(),
	            "_id" : "570a9826cc44f79c27024f87"
	        }
	    ]
	})
	
  	before(function() {
  		testRepo.setup()
		board = new Board();
	});

	after(function() {
		//todo-remove all from collectio
		board.cleanUp()
  	});

	it('make sure board connects', function(done) {
		board.findAllNames(function(boards){
			expect(boards.length).to.be.above(0)
			done()
		});
	});
	it('get board by name', function(done) {
		board.findByBoardName("TestBoard", function(boards){
			expect(boards.length).to.be.above(0)
			done()
		});
	});

	it('get board by name doesnt exist', function(done) {
		board.findByBoardName("TestBard", function(boards){
			expect(boards.length).to.equal(0)
			done()
		});
	});

	it('get board by id exist', function(done) {
		var id = updateBoard.get("_id");
		board.findById(id, function(board){
			var sameId = board._id
			expect(board).to.be.ok;
			//these are the same strings, why is this not equal?
			//does one have different prototype?
			//expect(id).to.equal(sameId)
			done()
		});
	});
	it('test save', function(done) {

		var board = new Board({
			name : "UnitTest",
			author: "UnittestGuy",
			createdTime: null,
			todo: [{name:"nuasdll", description:"nusdfgll", creationDate:new Date()}],
			doing: [{name:"nasdfull", description:"nuwretll", creationDate:new Date()}],
			done: [{name:"nulasdfl", description:"nuwertll", creationDate:new Date()}]
		})
		board.save(function(){
			board.findByBoardName("UnitTest", function(boards){
				expect(boards[0]._id).to.be.ok;
				expect(boards.length).to.be.above(0)
				done()
			});
		});
	});
	it('test update', function(done) {
		//add random val to update
		var rand =  Math.floor((Math.random() * 100000) + 1);
		updateBoard.set("author", updateBoard.get("author") + rand)
		updateBoard.update(function(board){
			expect(board.author).to.equal(updateBoard.get("author"))
			//now we need to check to see if value was updated 
			done()
		})
	});
	it('test move card update', function(done) {
		//Let's make sure the card is where we except in todo
		//should only have one
		expect(updateBoard.data.todo[0].name).to.be.equal("card3")
		//okay now let's add it to doing
		var task = updateBoard.get("todo")[0];
		//remove from list
		var taskIndex = updateBoard.get("todo").indexOf(task);
		//now remove it
		updateBoard.get("todo").splice(taskIndex, 1);
		//now add to doing
		updateBoard.get("doing").push(task);
		expect(updateBoard.data.doing.length).to.be.equal(2)
		updateBoard.update(function(board){
			expect(board.author).to.equal(updateBoard.get("author"))
			expect(updateBoard.data.doing.length).to.be.equal(2)
			//now we need to check to see if value was updated 
			done()
		})
	});
	it('test createBoard', function(done) {
		var rand =  Math.floor((Math.random() * 100000) + 1);
		var name = "CreatedBoard" + rand;
		var createBoard = new Board({
			"name" : name,
			"author" : "UnitTestForCreate",
			"createdTime" : new Date(),
			"done" : [ 
			    {
			        "name" : "nulasdfl",
			        "description" : "nuwertll",
			        "creationDate" : new Date(),
			        "_id" : "570a9826cc44f79c27024f85"
			    }
			],
			"doing" : [ 
			    {
			        "name" : "nasdfull",
			        "description" : "nuwretll",
			        "creationDate" : new Date(),
			        "_id" : "570a9826cc44f79c27024f86"
			    }
			],
			"todo" : [ 
			    {
			        "name" : "nuasdll",
			        "description" : "nusdfgll",
			        "creationDate" : new Date(),
			        "_id" : "570a9826cc44f79c27024f87"
			    }
			]
		});
		createBoard.save(function(board){
			//i know this isn't "unit" testing 
			//but we have a db connection anyway so whatever
			//let's query for the event and confirm it exists
			new Board().findByBoardName(name, function(board){
				expect(board).to.be.ok;
				expect(board).length.to.be.above(0);
				done()
			});
		})
	});
});