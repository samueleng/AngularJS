/*Because we are adding an external module, we need to be sure to include it as a dependency in our app: ui.Router  
ui-router is newer and provides more flexibility and features than ngRoute. 
*/
var app = angular.module("flappernews",['ngRoute','ui.router']) 
   
/* 
Now that we have ui-router included, we need to configure it. In our app.js, we're going to use the Angular config()  
function to setup a home state. 
*/ 
app.config( 
	['$stateProvider',
			'$urlRouterProvider', 
			function($stateProvider,$urlRouterProvider){ 
				$stateProvider.state('home', {  //state is given a name ('home'),
					url: '/home',
					templateUrl: '/home.html', 
					controller: 'MainCtrl'		//Our new state should be controlled by MainCtrl
			})
			$urlRouterProvider.otherwise('home') //we've specified what should happen if the app receives a URL that is not defined
    }])  
//All that's left to do is define the home.html template: move most of our HTML into an inline template


/* 
Up to this point, we've been storing important data directly in the controller. While this works, it has some disadvantages:

when the controller goes out of scope, we lose the data
that data cannot be easily accessed from other controllers or directives
the data is difficult to mock, which is important when writing automated tests
To rectify this problem, we're going to refactor our $scope.posts variable into a service.   

why we're using the keyword factory instead of service. In angular, factory and service are related 
in that they are both instances of a third entity called provider.
*/ 
app.factory('posts',[function(){ 
	/* 
	Creating a new object that has an array property called posts 
	Return that variable so that our o object essentially becomes exposed to any other Angular module that  
	cares to inject it. 

	You'll note that we could have simply exported the posts array directly, however, by exporting an object  
	that contains the posts array we can add new objects and methods to our services in the future.
	*/ 
	var o ={  
		/* 
		One thing that's is going to be absolutely fundamental to our app is displaying lists. 
		Fortunately, angular makes this really easy using the ng-repeat directive. 
		*/  
		
		posts: [ 
				  {title: 'post 1', upvotes: 5},
				  {title: 'post 2', upvotes: 2},
				  {title: 'post 3', upvotes: 15},
				  {title: 'post 4', upvotes: 9},
				  {title: 'post 5', upvotes: 4} 
			  ]
	} 
	return o;
}]) 
/*  
 Our next step is to inject the service into our controller so we can access its data.  
 Simply add the name of the service as a parameter to the controller we wish to access it from: 
*/
app.controller('MainCtrl', ['$scope', 'posts', 
	function($scope, posts){ 
		$scope.test = "Hello World!" 

		/* 
		To display our array of posts that exist in the posts factory (posts.posts),  
		we'll need to set a scope variable in our controller to mirror the array returned from the service. 

		Now any change or modification made to $scope.posts will be stored in the service and immediately accessible by  
		any other module that injects the posts service.
		*/
		$scope.posts = posts.posts

		/* 
		Now that we've learned how to display lists of information with Angular, it'd really be great if we  
		could have the user add posts. To do this, we first need to add a function to our $scope variable.  

		When this function is invoked, it will append a new post to our $scope.posts variable.  
		Now we're going to have to allow the user to actually execute this function.
		*/ 
		$scope.addPost = function(){ 
			$scope.posts.push( {title: 'A new post!', upvotes: 0 })
		} 

		/* 
		Have the addPost function retrieve the title entered into our form, which is bound to the $scope variable title,  
		and set title to blank once it has been added to the posts array:
		*/ 
		$scope.addCustomPost = function(){  
			//Prevent a user from submitting a post with a blank title  
			if(!$scope.title || $scope.title === '') {return;}  

			//$scope.posts.push( {title: $scope.title, upvotes: 0}) 
			/* 
			Next we're going to want to modify our addPost() function to include the link  
			(notice that we aren't going to force the user to submit a link if they don't want to): 
			*/
			$scope.posts.push({ 
				title: $scope.title,
				link: $scope.link, 
				upvotes: 0
			})
			$scope.title = '' 
			$scope.link = ''
		} 

		/* 
		We've now added a ^ character inside a <span> tag that when clicked, calls the incrementUpvotes()  
		function in our controller 
		Notice that for this function we are passing the current instance of post to the function.  
		This is happening by reference so when we increment upvotes, it gets automatically reflected back to the HTML page.
		*/ 
		$scope.incrementUpvotes = function(post){ 
			post.upvotes += 1
		}
	}
 
])  
 
 
