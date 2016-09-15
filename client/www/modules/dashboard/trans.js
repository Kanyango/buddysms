angular.module('buddySms.trans', [])

.controller('TransController' , function($scope , $http , auth)
{
	$scope.trans = {};

	$scope.buy = function()
	{
		$http.post('/trans' , $scope.trans ,
			{headers : {Authorization: 'Bearer ' + auth.getToken()}});
	};
});