angular.module('buddySms.outbox' , ['ui.bootstrap'])

.controller('OutboxController' , function($scope ,$http ,$uibModal , auth ){

	$http.get('/message' , 
	 	{headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
        $scope.messages = response.data;
        //$scope.contacts = response.data;
        $scope.totalItems = $scope.messages.length;
        console.log($scope.messages);
    });

    $scope.currentPage = 1;
          $scope.numPerPage = 5;
          
        $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.messages.indexOf(value);
            return (begin <= index && index < end);
          };

      $scope.open = function(user)
       {
        var modalInstance = $uibModal.open({
            templateUrl : 'modules/dashboard/viewMessage.html',
            controller  : 'EditMessageModalController',
            size : 'md',
            resolve : {

                select : function() {
                    return  user;
                }
            }
        });

      };
})
.controller('EditMessageModalController', 
    function ($http , $scope , $uibModalInstance , select , auth) {

  $scope.select = select;

  console.log($scope.select); 

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});