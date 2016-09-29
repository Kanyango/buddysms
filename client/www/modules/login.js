angular.module('buddySms.login',['buddySms.dash'])

.controller('LoginController', 
	function($scope ,$http ,auth, $state , $location , store){

	$scope.user = {};
		
		$scope.login = function()
		{
			auth.login($scope.user)
			.error(function(data , error , status){
				console.log($scope.user);

			})
			.success(function(response){
				$state.go('dash.home');
			});
		};

});