angular.module('buddySms.login',['buddySms.dash'])

.controller('LoginController', 
	function($scope ,$http ,auth, $state , $location , store){

	$scope.user = {};
		
		$scope.login = function()
		{
			console.log($scope.user);
			auth.login($scope.user)
			.error(function(data , status , headers){
				$scope.min = data.message;
			})
			.success(function(response){
				$state.go('dash.home');
			});
		};

});
