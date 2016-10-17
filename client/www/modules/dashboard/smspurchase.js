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
		console.log($scope.trans);
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
				$scope.sms.items = $scope.amount / 1.5

				console.log($scope.sms.items);
				$http.post('/updatesms' ,$scope.sms , {headers: {Authorization: 'Bearer ' + auth.getToken()}}).
				then(function(response){
				$state.go('dash.home');
				});
				if($scope.amount < 500)
				{
				$scope.min = "Dear Client , You purchased less than 500 sms credits . Please purchase more than 500 sms credits to continue enjoying this service";
				}
			}

		});
	}

})
