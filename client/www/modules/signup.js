angular.module('buddySms.signUp', ['buddySms.dash'])

.controller('SignUpController' , function($scope , $state , auth){

	$scope.user = {};

	$scope.signup = function()
	{
		    auth.register($scope.user).
		    success(function(res){
		    	$scope.res = response;
			}).error(function(resp , status , headers){
				$scope.resp = status;
				if($scope.resp > 299)
				{
					$scope.min = 'error';
				}
			});
	};
});
