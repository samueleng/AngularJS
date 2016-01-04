var app = angular.module("MyApp", ['ngRoute']) 
  
 
/* 
  Firstly we select the paragraph element, which is a child of the my-widget element using Angular’s children() function  
  as defined by element.  
  In the second step we use jQuery to bind to the click event and modify the css property on click. 
  This is of particular interest since we have a mixture of Angular element functions and jQuery here. In fact under the 
  hood Angular will use jQuery in the children() function if it is defined and will fall back to jqLite  
  (shipped with Angular) otherwise.  

  attributes : For example, you can attach attributes in HTML like: 
  <hello-world some-attribute></hello-world> and access it in the link function as attrs.someAttribute.
*/
app.directive("myWidget",function(){ 
	var linkFunction = function(scope,element,attributes) { 
		var paragraph = element.children()[0] 
		$(paragraph).on("click",function(){ 
			$(this).css({"background-color": "red"})
		})
	}

	 /* 
	  The restriction means that this directive can only be used as an HTML element and not for example an HTML attribute.  
	  if you want to use it as an HTML attribute, change the restrict to return A instead.  
	  The usage would then have to be adapted to: 

		<div my-widget>  
			<p>Hello World</p>
		</div>
	 */
	 return { 
	 	restrict: "E",
	 	link: linkFunction
	 } 
}) 
 	/*	
		Directive names must be camel cased. app.directive("myWidget", function () {  
		inorder to be able to use it as my-widget in the view  

	*/
	app.directive("myDirective",function(){ 
		return { 
			restrict: 'E',  
			//you basically use transclude when you want to preserve the contents of an element 
			// when you're using a directive. 
			transclude: true,  
			/* 
			Note: Contents of the element with ng-transclude are not appended but completely replaced. 
				  Version >= 1.2.9
			*/ 

			template: '<div class="something" ng-transclude> This is my directive content</div>'  

			/*  
			   you can have both contents by including in your template a simple container tag (like div or span)  
			   with the ng-transclude attribute. This means that the following code in your template should include all  
			   content 
			*/
			//template: '<div class="something"> This is my directive content <div class="something" ng-transclude></div></div>'

		} 
	})  
