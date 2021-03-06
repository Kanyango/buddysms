angular.module('buddySms',
	['ui.router',
	'ngMessages',
	'angularUtils.directives.dirPagination',
	'buddySms.dataService',
	'buddySms.auth',
	'buddySms.smstoken',
	'angular-storage',
	'buddySms.signUp',
    'buddySms.login',
    'buddySms.recovery',
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
		 controller: 'SignUpController',
		  onEnter     : ['$state', 'auth' , function($state , auth){
		      if(auth.isLoggedIn()){
			  $state.go('dash.home');
		      }
		    }]
		})
	 .state('login',
		{
		 url: '/login',
		 templateUrl: '/modules/login.html',
		 controller: 'LoginController', 
		  onEnter     : ['$state', 'auth' , function($state , auth){
				      if(auth.isLoggedIn()){
					  $state.go('dash.home');
				      }
				 }]
		})
	 .state('recovery',
		{
		 url: '/recovery',
		 templateUrl: '/modules/recovery.html',
		 controller: 'RecoveryController' 
		})
	.state('about',
		{
		 url: '/about',
		 templateUrl: '/modules/about.html' 
		})
	.state('smshome',
		{
		 url: '/buddysms',
		 templateUrl: '/modules/buddySms.html' 
		});
	$urlRouterProvider.otherwise('/home');
	
	$httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
});
