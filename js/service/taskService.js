(function()
{
    var angularApp = angular.module("KANBAN");

	angularApp.factory('taskService', function ($rootScope) {
	    var taskService = {};

	    taskService.fetchBoard(name){
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
    }

}());