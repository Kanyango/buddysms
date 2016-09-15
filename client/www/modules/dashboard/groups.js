angular.module('buddySms.groups',['oi.select','ui.bootstrap'])

.controller('GroupsController', function($scope ,$filter , $http, auth ,$uibModal){

		$http.get('/contact', 
		{headers : {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(response){
        $scope.contacts = response.data;
      });

    $http.get('/contactgroup' , 
	 	{headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
        $scope.users = response.data;
        //$scope.contacts = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users);
    });
	
	$scope.save = function(){

	$http.post('/contact' , $scope.group ,  
		{headers : {Authorization: 'Bearer ' + auth.getToken()}})
  .then(function(response){
    $http.get('/contactgroup' , 
    {headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
        $scope.users = response.data;
        //$scope.contacts = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users);
    });
  });
   $scope.group = {};
	};

          $scope.currentPage = 1;
          $scope.numPerPage = 5;
          
        $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.users.indexOf(value);
            return (begin <= index && index < end);
          };


      $scope.open = function(user)
       {
        var modalInstance = $uibModal.open({
            templateUrl : 'modules/dashboard/editGroups.html',
            controller  : 'EditModalController',
            size : 'md',
            resolve : {

                select : function() {
                    return  user;
                }
            }
        });

      };

    $scope.remove = function(id)
    {
    $http.delete('/contact/'+ id)
    .then(function(response){
    $http.get('/contactgroup' ,{headers : {Authorization: 'Bearer ' + auth.getToken()}})
     .then(function(response){
        $scope.users = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users.length);
    });
   });    
 };

})
.controller('EditModalController', 
    function ($http , $scope , $uibModalInstance , select , auth) {

  $scope.select = select;

  console.log($scope.select);

  $http.get('/contact', 
    {headers : {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(response){
        $scope.contacts = response.data;
      });

 

  $scope.update = function(select)
    {
        $http.put('/contact/' , select ,
            {headers : {Authorization: 'Bearer ' + auth.getToken()}});
    };

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});