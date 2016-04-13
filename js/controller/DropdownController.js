/**
 * Created by andrew.larsen on 4/12/2016.
 */
(function()
{
    var angularApp = angular.module("KANBAN");
    var DropdownContoller = function ($scope, $http) {
    	$scope.name = "Kanban Board"
    	$scope.boardNames=[];
    	$scope.todo=[];
    	$scope.doing=[];
    	$scope.done=[];
    	$scope.setBoard=function(name){
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
    	function getNames(){
    		$http({
    			method: 'GET',
  				url: 'http://localhost:3000/getBoards'
			}).then(function successCallback(response) {
		    		response.data.forEach(function(val, index){	
		    			if($scope.boardNames.indexOf(val.name)<0){   			
		    				$scope.boardNames.push(val.name)
		    			}
		    			//otherwise it's been added
		    		})
			  }, function errorCallback(response) {
			    	alert("failed request with error" + response);
			  });
    	}
    	function setBoard(response){
			var board = response.data[0]
			$scope.name= board.name;
			//now get rows
			var todo=board.todo;
			var doing = board.doing;
			var done = board.done;
			//looks like we have to reset these each time
			$scope.done=[]
			$scope.doing=[]
			$scope.todo=[]
			//now add new boards
			todo.forEach(function(val, index){
				$scope.todo.push(val.name)
			})
			doing.forEach(function(val, index){
				$scope.doing.push(val.name)
			})
			done.forEach(function(val, index){
				$scope.done.push(val.name)
			})
    	}

    	getNames();

    }
    angularApp.controller("DropdownContoller", ["$scope","$http",DropdownContoller])
}());