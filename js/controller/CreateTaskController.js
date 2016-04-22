/**
 * Created by andrew.larsen on 4/12/2016.
 */
(function()
{
    var angularApp = angular.module("KANBAN");
    var CreateTaskController = function ($scope, $http, TaskService) {
		console.log(TaskService)
		function onSuccess(response){
			
		}
		function onError(error){
			
		}
		$scope.createTask =function(name, taskName, description){
			var data = TaskService.getData();
			 $http.post(
                'http://localhost:3000/updateBoard',
                {
                    data
                }
            ).then(onSuccess, onError)
		}

    }
    angularApp.controller("CreateTaskController", ["$scope","$http","TaskService", CreateTaskController])
}());