angular.module('buddySms.dash',
	['buddySms.send',
	'buddySms.trans',
	'buddySms.contact',
	'buddySms.groups',
	'buddySms.outbox','buddySms.home',
	'buddySms.smspurch',
	'buddySms.sender'])

.config(function($stateProvider){
	$stateProvider
	.state('dash',
		{
		 url: '/dash',
		 templateUrl: '/modules/dashboard/dash.html',
		 controller: 'DashController' 
		})
	.state('dash.topup',
		{
		 url: '/dash/topup',
		 templateUrl: '/modules/dashboard/topup.html',
		 controller: 'TopUpController' 
		})
	.state('dash.sendsms',
		{
		 url: '/dash/sendsms',
		 templateUrl: '/modules/dashboard/sendsms.html',
		 controller: 'SendSMS' 
		})
	.state('dash.trans',
		{
		 url: '/dash/transactions',
		 templateUrl: '/modules/dashboard/trans.html',
		 controller: 'TransController' 
		})
	.state('dash.home',
		{
		 url: '/dash/home',
		 templateUrl: '/modules/dashboard/home.html',
		 controller: 'HomeController'
		})
	.state('dash.contact',
		{
		 url: '/dash/contact',
		 templateUrl: '/modules/dashboard/contacts.html'
		})
	.state('dash.contact.contactlist',
		{
		 url: '/contact/contactlist',
		 templateUrl: '/modules/dashboard/contactlist.html',
		 controller : 'ContactController'
		})
	.state('dash.outbox',
		{
		 url: '/dash/outbox',
		 templateUrl: '/modules/dashboard/outbox.html',
		 controller : 'OutboxController'
		})
	.state('dash.purchase',
		{
		 url: '/smspurchase',
		 templateUrl: '/modules/dashboard/smspurchase.html',
		 controller : 'SmsPurchController'
		})
	.state('dash.senderId',
		{
		 url: '/senderId',
		 templateUrl: '/modules/dashboard/senderId.html',
		 controller: 'SenderIdController'
		})
	.state('dash.contact.groups',
		{
		 url: '/contact/groups',
		 templateUrl: '/modules/dashboard/groups.html',
		 controller : 'GroupsController'
		});
})


.controller('DashController' , function($scope , auth , meanServe){
  $scope.user = {};
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
  //meanServe.getUser().success(function(data){
    //$scope.user = data;
  //});
	$scope.logOut = auth.logOut;
});