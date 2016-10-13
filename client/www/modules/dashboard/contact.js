angular.module('buddySms.contact',['ui.bootstrap','oi.select','ngTagsInput','ngFileUpload'])

.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
 
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }])
     .service('fileUpload', ['$http','auth', function ($http , auth) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);
 
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined , 
                        Authorization: 'Bearer ' + auth.getToken()
                      }
           })
           .then(function(response){
            var pload = response.data;
            console.log(pload);
            for(var l = 0; l < pload[0].length; l++)
              { 
                  console.log(pload[0][l]) 
              }
              this.k = pload[0];
              console.log(this.k);
            /*$http.post('/exel', this.k , 
              {headers:{Authorization: 'Bearer ' + auth.getToken()}})
            .then(function(res){
              var ploady = res.data;
              console.log(ploady);
            });*/
           });
        }
     }])
.controller('ContactController' ,
    function($scope , $http , $filter , auth , $uibModal , $window ,fileUpload){

      $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/upload";
           fileUpload.uploadFileToUrl(file, uploadUrl);
        };
    $scope.users = [];
    $scope.group = [];
  
    $http.get('/contact' ,{headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
        $scope.users = response.data;
        //$scope.contacts = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users.length);
    });

          $scope.currentPage = 1;
          $scope.numPerPage = 5;
          
        $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.users.indexOf(value);
            return (begin <= index && index < end);
          };

    //var $ctrl = this;

    $scope.open = function(user)
    {
        var modalInstance = $uibModal.open({
            templateUrl : 'modules/dashboard/editContact.html',
            controller  : 'ModalController',
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
    $http.get('/contact' ,{headers : {Authorization: 'Bearer ' + auth.getToken()}})
     .then(function(response){
        $scope.users = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users.length);
    });
    });    
    };


	$scope.saveContact = function()
	{
		$http.post('/contact' , $scope.user ,
		{headers : {Authorization: 'Bearer ' + auth.getToken()}})
        .then(function(response){
     $http.get('/contact' ,
        {headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
        $scope.users = response.data;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users.length);
    });

        });
         $scope.user = {};
	};

})

.controller('ModalController', 
    function ($http , $scope , $uibModalInstance , select , auth) {

  $scope.select = select;

  console.log($scope.select);

 

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

