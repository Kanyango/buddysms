angular.module('buddySms.home' , [])

.controller('HomeController' , function($scope , $http , auth){

	$http.get('/getSMS' , {headers: {Authorization: 'Bearer ' + auth.getToken()}})
	.then(function(res){
		$scope.sms = res.data;
		console.log($scope.sms);
	});

});