/**
 * Created by andrew.larsen on 4/12/2016.
 */
(function()
{
    var angularApp = angular.module("KANBAN");
    var CreateTaskController = function ($scope, $http) {

		function onSuccess(response){
			
		}
		function onError(error){
			
		}
		$scope.createTask =function(name, taskName, description){
			 $http.post(
                'http://localhost:3000/updateBoard',
                {
                    userName: userName, password: password
                }
            ).then(onSuccess, onError)
		}

    }
    angularApp.controller("CreateTaskController", ["$scope","$http",CreateTaskController])
}());