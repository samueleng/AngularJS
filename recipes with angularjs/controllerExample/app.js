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
 
