angular.module('buddySms.send' , ['ngTagsInput','typeahead'])

.directive('myModelValue', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function (scope, element, attr, controller) {
                attr.$observe('myModelValue', function (finalValue) {
                    scope.model = finalValue;
                });
            }
        };
 })

.controller('SendSMS', function($scope , $http , $q ,  auth , $window){

	    $scope.tags = [];
            $scope.text = {};
            $scope.text.token = $window.localStorage.access_token;
            
            $scope.authParams = 
		      { 
		        "type" : "access_token",
		        "username" : "Dave",
		        "password" : "androidapps"
		      }
      
     
      

      $http.get('/contacts', {headers : {Authorization: 'Bearer ' + auth.getToken()}})
      .success(function(response){
        $scope.contacts = response;
      });

	$scope.loadUsers = function($query){
	 return $http.get('/contact', 
	 	{headers : {Authorization: 'Bearer ' + auth.getToken()}} ,
	 	{ cache: true}).then(function(response) {
        var countries = response.data;
        return countries.filter(function(country) {
          return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;

      });
    });
  };

  

  $scope.send = function()
  {
    //console.log($scope.bundle);
    $scope.text.rec = [];
    for(var k = 0; k < $scope.bundle.length; k++)
    {
      //console.log($scope.bundle[k]["value"]);

      //$scope.rec.push($scope.bundle[k]["value"]);

    if(angular.isArray($scope.bundle[k]["value"]))
      {
        for(var l = 0; l < $scope.bundle[k]["value"].length; l++)
        {
          //console.log($scope.bundle[k]["value"][l]["value"]);

          console.log($scope.bundle[k]["value"][l]["value"]);

           $scope.rec.push($scope.bundle[k]["value"][l]["value"]);

        }
      }
      else
      {
        $scope.text.rec.push($scope.bundle[k]["value"]); 
      }
      
    } 

    console.log($scope.rec);      
    $scope.ceci = $scope.text.rec.length;
    console.log($scope.ceci);  
    $scope.reci = $scope.ceci; 
  }
  $scope.count = function()
  {
    $scope.max = 140;
    $scope.text.message.length;

    if($scope.text.message.length < $scope.max)
    {
      $scope.chars = 1;
    }
    else
    {
        $scope.y = Math.ceil($scope.text.message.length/$scope.max);
        console.log($scope.y);
        $scope.chars = $scope.y;
    }
  }
  
   $scope.testAuth = function()
      { 
      	if(typeof $window.localStorage.access_token === 'undefined' || $window.localStorage.access_token === null)
      	{
         $http.post('/authenticateText')
         .then(function(response){
          //console.log(response);
          $scope.token = response.data;
          //console.log($scope.token);
          $scope.smstok = $scope.token.payload.access_token;
          //console.log($scope.smstok);
          $window.localStorage.access_token = $scope.smstok;
          //console.log($window.localStorage.access_token);
        });	
      	}
      	else
      	{
      		 $http.post('/message' , $scope.text , 
		   {headers : {Authorization: 'Bearer ' + auth.getToken()}})
	           .success(function(data, status, headers, config){
	           	$scope.rey = status;
	           	$scope.yey = data;
	           	console.log($scope.rey);
	           	console.log($scope.yey);
	           	console.log($scope.yey + 'Kipii');
	           })
	           .error(function(data, status, headers, config)
	           { 
	           	$http.post('/authenticateText')
		 	.success(function(response){
		          //console.log(response);
		          $scope.token = data.payload.access_token;
		          //console.log($scope.token);
		          $scope.smstok = $scope.token.payload.access_token;
		          //console.log($scope.smstok);
		          $window.localStorage.access_token = $scope.smstok;
		          //console.log($window.localStorage.access_token);
		         $http.post('/message' , $scope.text , 
		        {headers : {Authorization: 'Bearer ' + auth.getToken()}})
	                 .success(function(response){
	                 	$scope.repy = response.data.status_code;
	                 	console.log($scope.repy);
	                 	
	                 });
		      });
	           });
      	}
      }
      	
      	         
     

});
