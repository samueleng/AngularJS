/* 
The directive implementation returns a link function which defines the directive’s behavior.  
It gets passed the scope, the HTML element and the HTML attributes. 
*/ 

var app = angular.module("MyApp", ['ngRoute']) 

app.directive("show", function() {
  return {
    link: function(scope, element, attrs) { 
    // Since we passed the visible variable as an attribute to our show directive, 
    // we can access it directly via attributes.show 
    // But, since we want to respond to visible variable changes automatically we have to use the $watch service,  
    // which provides us with a function callback whenever the value changes.
      scope.$watch(attrs.show, function(value){
        element.css('display', value ? '' : 'none');
      });
    }
  }; 

});   
 
//Add a controller to your application, and refer to the controller with the ng-controller directive:
var ctrl = angular.module("app", []) 
		   
app.controller("MyCtrl", function($scope){ 
 	$scope.value = "I succeeded!"; 
})
    