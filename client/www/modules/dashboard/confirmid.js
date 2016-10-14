angular.module('buddySMS.confirm' , [])

.controller('ConfirmId' , function($scope , $http){

	$scope.confirm = function()
	{
		$http.post('/confirmsms' , $scope.trans)
		.then(function(response){
			$scope.kop = response;
			$scope.smspurchresp = response.data;
			console.log($scope.smspurchresp);
			console.log($scope.kop);
			if($scope.smspurchresp.length <= 0)
			{
				$scope.oops = "Error Transaction does not exist";
				
			}
			else
			{
				$scope.amount = response.data["0"].amount;
				console.log($scope.amount);
				$scope.sms = {};
				$scope.sms.items = $scope.amount;
				console.log($scope.sms.items);
				$http.post('/updatesms' ,$scope.sms , {headers: {Authorization: 'Bearer ' + auth.getToken()}}).
				then(function(response){
				//$state.go('dash.home');
				});
				if($scope.amount < 10,000)
				{
				$scope.min = "Dear Client , You paid less than Ksh.10,000 . Please add more to get your branded sender id ";
				}
			}

		});
	}
})