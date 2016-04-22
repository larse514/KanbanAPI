(function()
{
    var angularApp = angular.module("KANBAN");
	var TaskService = function ($rootScope) {
	    var taskService = {};
	    var data = {};
	    var fetchBoard = function(name){
	   		$http({
    			method: 'GET',
  				url: 'http://localhost:3000/getByName',
  				params: {name: name}
			}).then(function successCallback(response) {
						//just get first for now
						//todo-how to limit, or have primary key in mongo
						setBoard(response);
		    			//otherwise it's been added		    		
			  }, function errorCallback(response) {
			    	alert("failed request with error" + response);
			  });
	    }
	    var setData = function (data){
	    	this.data = data;
	    }
	    var getData = function(){
	    	return this.data;
	    }
	    return{
	    	fetchBoard:fetchBoard,
	    	setData:setData,
	    	getData:getData

	    }
    }
    angularApp.factory("TaskService", ["$rootScope",TaskService])

}());