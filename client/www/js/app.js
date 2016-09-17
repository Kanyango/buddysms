angular.module('buddySms',
	['ui.router',
	'angularUtils.directives.dirPagination',
	'buddySms.dataService',
	'buddySms.auth',
	'angular-storage',
	'buddySms.signUp',
    'buddySms.login',
	])
.config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post['X-Posted-By'] = 'https://buddysms.herokuapp.com';
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
.config(function($stateProvider , $urlRouterProvider){

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
});
