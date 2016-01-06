var app = angular.module("MyApp", ['ngRoute'])  
  
//wrap a text argument within a single strong element.
app.directive('strongMessage', function() {
    return function(scope, element, attrs) {  
      element.html('<strong>' + attrs.strongMessage + '</strong>');
    };
  });  
 
// template to create an arbitrary number of li elements. 
// link is the function which used when you need to attach event handler, modify DOM. 
// controller is used when you need to share or reuse $scope data. Or when you want directive interactive with each other. 
/* 
Angular will handle invoking the template with the proper scope object and appending the output to the directive's element 
*/
app.directive('wordList', function(){ 
	return { 
		link: function(scope,element,attrs){ 
			scope.words = attrs.wordList.split(" "); 
		}, 
		template: "<li ng-repeat='word in words'>\
                   {{word}}\
                   </li>"
		} 	
}) 
  

/* 
In the compile function, we append an expression {{name}} into the template and in the postLink function,  
we assign “Samuel” to scope.name and directive return: “My name is Samuel”  
We can’t do that in the postLink function because it can’t compile angular expression.
*/
app.directive('compileExample', function(){ 
 		return { 
 			restrict: 'E', 
 			scope: true, 
 			compile: function(tElement,tAttrs){ 
 				angular.element(tElement).append("My name is {{name}}") 
 				return function postLink(scope, element,attrs){ 
 					scope.name = 'Samuel'
 				}
 			}
 		}
}  
 








