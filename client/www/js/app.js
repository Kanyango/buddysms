angular.module('buddySms',
	['ui.router',
	'angularUtils.directives.dirPagination',
	'buddySms.dataService',
	'buddySms.auth',
	'angular-storage',
	'buddySms.signUp',
        'buddySms.login'
	])
.config(function($stateProvider , $urlRouterProvider , $httpProvider){

	$stateProvider
	.state('home',
		{
		 url: '/home',
		 templateUrl: '/modules/home.html' 
		})
	 .state('signup',
		{
		 url: '/signup',
		 templateUrl: '/modules/signup.html',
		 controller: 'SignUpController' 
		})
	 .state('login',
		{
		 url: '/login',
		 templateUrl: '/modules/login.html',
		 controller: 'LoginController' 
		})
	.state('about',
		{
		 url: '/about',
		 templateUrl: '/modules/about.html' 
		});
	$urlRouterProvider.otherwise('/home');
	
	$httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
});
