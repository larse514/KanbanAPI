var express = require('express');
var router = express.Router();
var boards = require("../service/boards.js")
var constants = require('../util/constants.js')
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join('/index.html'))
});

router.get('/getBoards', boards.getAllNames);
router.get('/getByName', boards.getByName);
router.post('/createBoard', boards.create);
router.post('/updateBoard', boards.update);
router.get('/areAToaser', function(req,res,next){
	res.status(constants.IAMATEAPOT.code);
  	res.send(constants.IAMATEAPOT);
})


module.exports = router;
