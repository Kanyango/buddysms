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
		$http.post('/confirmsms' ,$scope.trans , 
			{header: {Authorization: 'Bearer '+ auth.getToken()}})
		.then(function(response){

			$scope.smspurchresp = response.data.status;

			if($scope.smspurchresp > 01)
			{
				$scope.oops = "Error";
			}
			else
			{
				//route to home page and update no of sms in db
				//alert user success

				$state.go('dash.home');

				//update db
				$http.post('/addsms' $scope.total)
			}

		});
	}

})
