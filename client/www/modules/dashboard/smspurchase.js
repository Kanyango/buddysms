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
			$scope.smspurchresp = response.data.amount;
			console.log($scope.smspurchresp);
			console.log($scope.kop);
			if(typeof $scope.smspurchresp === 'undefined' || $scope.smspurchresp === null )
			{
				$scope.oops = "Error Transaction does not exist";
				
			}
			else
			{
				//route to home page and update no of sms in db
				//alert user success

				$state.go('dash.home');

				//update db
				//$http.post('/addsms' $scope.total)
			}

		});
	}

})
