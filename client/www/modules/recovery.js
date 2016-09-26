angular.module('buddySms.recovery',[])

.controller('RecoveryController' , function($scope , $http , auth){

	$http.get('/recover' , {header: {Authorization: 'Bearer '+ auth.getToken()}})
	.then(function(response){
		$scope.mail = response.data;
		console.log($scope.mail);
	});

});