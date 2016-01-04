//With the latest versions of Angular (>1.3.0),  
//you can't declare a global constructor function and use it with ng-controller.   

(function() {  
	//A quick fix would be to create an angular module and add MyCtrl as a controller.
	angular
        .module("app", [])
        .controller("MyCtrl", MyCtrl);

    MyCtrl.$inject = ["$scope"];  
   
    //The controller implementation defaults the visible attribute to true and toggles its Boolean state in the toggle  
    //function. Both the visible variable and the toggle function are defined on the $scope service which is passed to all  
    //controller functions automatically via dependency injection.
	function MyCtrl($scope){ 
		$scope.visible = true; 

		$scope.toggle = function(){ 
			$scope.visible = !$scope.visible;
		}; 
	}; 

})();    
 
var app = angular.module("MyApp", []);
 
/* 
The factory method creates a singleton UserService, that returns two functions for retrieving all users  
and the first user only. The controllers get the UserService injected by adding it to the controller function as params. 
*/
app.factory("UserService", function() {
  var users = ["sam", "germaine", "Nina"];

  return {
    all: function() {
      return users;
    },
    first: function() {
      return users[0];
    }
  };
});

app.controller("FirstCtrl", function($scope, UserService) {
  $scope.users = UserService.all();
});

app.controller("AnotherCtrl", function($scope, UserService) {
  $scope.firstUser = UserService.first();
});

 
