angular.module('buddySms.sender' , [])

.controller('SenderIdController', function($scope , $http , auth){

	$scope.senderId = function()
	{
		$http.post('/branded' , $scope.brand , 
			{header: {Authorization: 'Bearer '+ auth.getToken()}})
		.then(function(res){
			$scope.id = res.data;
			console.log($scope.id);
		});
	}
});