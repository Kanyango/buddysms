angular.module('buddySms.sender' , [])

.controller('SenderIdController', function($scope , $http , auth , $state){

	$scope.senderId = function()
	{
		$http.post('/branded' , $scope.brand , 
			{headers : {Authorization: 'Bearer ' + auth.getToken()}})
		.then(function(res){
			$scope.id = res.data;
			console.log($scope.id);
			$state.go('dash.senderconfirm');
		});
	}
});