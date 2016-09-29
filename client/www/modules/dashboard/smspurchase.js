angular.module('buddySms.smspurch', [])

.directive('mySmsValue', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function (scope, element, attr, controller) {
                attr.$observe('mySmsValue', function (finalValue) {
                    scope.model = finalValue;
                });
            }
        };
 })

.controller('SmsPurchController' , function($scope , $http , $state , auth){

	$scope.credit = {};

	$scope.trans = {};

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
				$scope.sms.items = $scope.amount * 100/104
				console.log($scope.sms.items);
				$http.post('/updatesms' ,$scope.sms , {headers: {Authorization: 'Bearer ' + auth.getToken()}}).
				then(function(response){
				$state.go('dash.home');
				})
			}

		});
	}

})
