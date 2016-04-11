var express = require('express');
var router = express.Router();
var boards = require("../service/boards.js")
var constants = require('../util/constants.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', boards.getAll);
router.get('/getByName', boards.getByName);
router.post('/createBoard', boards.create);
router.post('/updateBoard', boards.update);
router.get('/areAToaser', function(req,res,next){
	res.status(constants.IAMATEAPOT.code);
  	res.send(constants.IAMATEAPOT);
})


module.exports = router;
