//JSON response objects
var constants = require('./constants.js')

//TODO-refactor to one exposed point
var badRequest = function(res) {
	res.status(constants.BAD_REQUEST.code);
	res.json({
		"status":constants.BAD_REQUEST.code,
		"message":constants.BAD_REQUEST.message
	});
}

var unauthorized = function (res){
	res.status(constants.UNAUTHORIZED.code);
	res.json({
		"status":constants.UNAUTHORIZED.code,
		"message":constants.UNAUTHORIZED.message
	});
}

var expiredToken = function(res){
	res.status(constants.TOKEN_EXPIRED.code);
	res.json({
		"status":constants.TOKEN_EXPIRED.code,
		"message":constants.TOKEN_EXPIRED.message
	});
}

var invalidUser = function(res){
	res.status(constants.INVALID_USER.code);
	res.json({
		"status":constants.INVALID_USER.code,
		"message":constants.INVALID_USER.message
	});
}

var internalServerError = function(res){
	res.status(constants.INTERNAL_SERVER_ERROR.code);
	res.json({
		"status":constants.INTERNAL_SERVER_ERROR.code,
		"message":constants.INTERNAL_SERVER_ERROR.message
	});
}

var ok = function(res) {
	res.status(constants.OK.code);
	res.json({
		"status": constants.OK.code,
		"message": constants.OK.message
	});
}

var iamateapot = function(res){
	res.status(constants.IAMATEAPOT.code);
	res.json({
		"status": constants.IAMATEAPOT.code,
		"message": constants.IAMATEAPOT.message
	});
}

module.exports = {
	badRequest : badRequest,
	unauthorized : unauthorized,
	expiredToken : expiredToken,
	invalidUser: invalidUser,
	internalServerError: internalServerError,
	ok:ok,
	iamateapot:iamateapot
}