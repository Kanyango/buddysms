angular.module('buddySms.signUp', ['buddySms.dash'])

.controller('SignUpController' , function($scope , $state , auth){

	$scope.user = {};


	$scope.signup = function()
	{
		    auth.register($scope.user).error(function(data , error , status){
			$scope.error= $ionicPopup.alert({
            title: 'Error',
            template: 'OOops User exists ' 
   			});
			}).success(function(){
			$state.go('dash');
			$scope.user = null;
			});
	};
});
