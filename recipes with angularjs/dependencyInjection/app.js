var app = angular.module("MyApp", ['ngRoute'])  

 
/* 
For example, imagine that we need a directive that can apply a discount as well as currency formatting to a price  
value on the scope. The directive will need access to a custom calculateDiscount service, defined as follows.   
 
Note on app.factory 
The purpose of AngularJS service / factory function is to generate a single object or function that represents  
the service to rest of the application. That object or function is passed as a parameter to any other factory function  
which specifies a dependency on this service. 
*/
app.value('discountRate', 0.8)	//app.value('discountRate', 0.8) = discountRate = 0.8	
  .factory('calculateDiscount', function(discountRate) {
    return function(amount) {
      return amount * discountRate;
    };
  });

/* 
Using our enclosing recipe wrapper function, we simply inject the calculateDiscount service  
as well as the built-in currency filter.
*/
app.directive('discount', function(calculateDiscount, currencyFilter) {
    return function(scope, element, attrs) {
      var price = scope.$eval(attrs.discount);
      var discountPrice = calculateDiscount(price);
      element.html(currencyFilter(discountPrice));
    };
}); 
 

/* 
Example of creating a app.value for use  
*/ 
 
// define a value
app.value('myThing', 'weee');

// define a constant
app.constant('myConst', 'blah');

// use it in a service 'myService'
app.factory('myService', ['myThing', 'myConst', function(myThing, myConst){
   return {
       whatsMyThing: function()  
       				 { 
          				return myThing; //weee
      				 },
       getMyConst: function ()  
       				{
          				return myConst; //blah
       				}
   };
}]);
   
// use it in a controller
app.controller('someController', ['$scope', 'myThing', 'myConst', 
    function($scope, myThing, myConst) {
        $scope.foo = myThing; //weee
        $scope.bar = myConst; //blah
}]); 
 
/*  
A service holds a reference to any object. (only object creation happens.)

A factory is a function which returns any object (can run custom code in the factory)

A provider is a function which returns any function 

Difference between service and factory 
*/ 
app.service('myService', function() {

  // service is just a constructor function
  // that will be called with 'new'

  this.sayHello = function(name) {
     return "Hi " + name + "!";
  };
});

app.factory('myFactory', function() {

  // factory returns an object
  // you can run some code before

  return {
    sayHello : function(name) {
      return "Hi " + name + "!";
    }
  }
});
