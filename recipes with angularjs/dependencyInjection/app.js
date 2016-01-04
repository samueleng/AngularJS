var app = angular.module("MyApp", ['ngRoute'])  

 
/* 
For example, imagine that we need a directive that can apply a discount as well as currency formatting to a price  
value on the scope. The directive will need access to a custom calculateDiscount service, defined as follows. 
*/
angular.module('MyApp')
  .value('discountRate', 0.8)	
  .factory('calculateDiscount', function(discountRate) {
    return function(amount) {
      return amount * discountRate;
    };
  });

/* 
Using our enclosing recipe wrapper function, we simply inject the calculateDiscount service  
as well as the built-in currency filter.
*/
angular.module('MyApp')
  .directive('discount', function(calculateDiscount, currencyFilter) {
    return function(scope, element, attrs) {
      var price = scope.$eval(attrs.discount);
      var discountPrice = calculateDiscount(price);
      element.html(currencyFilter(discountPrice));
    };
});