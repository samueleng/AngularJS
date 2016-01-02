//With the latest versions of Angular (>1.3.0),  
//you can't declare a global constructor function and use it with ng-controller.  

(function() {  
	//A quick fix would be to create an angular module and add MyCtrl as a controller.
	angular
        .module("app", [])
        .controller("MyCtrl", MyCtrl);

    MyCtrl.$inject = ["$scope"];  

	function MyCtrl($scope){ 
		$scope.visible = true; 

		$scope.toggle = function(){ 
			$scope.visible = !$scope.visible;
		}; 
	};
})(); 
