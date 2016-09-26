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

<<<<<<< HEAD
.controller('SendSMS', function($scope , $http , $q ,auth ,tokensms ,$window){

	    $scope.tags = [];
      $scope.text = {};
=======
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
      
     
      
>>>>>>> origin/master

      $scope.authParams = 

      { 
        "type" : "access_token",
        "username" : "",
        "password" : ""
      }
      
      $scope.testauth = function()
      {
        if(tokensms.checkToken() == '')
        {
          //get token and save to localstorage
        }
        else {
          //if token exists send sms
        }
        $http.post('https://sms.solutions4mobile.com' , $scope.authParams)
        .then(function(response){
          console.log(response.data);
        });
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
<<<<<<< HEAD
    for(var k = 0; k < $scope.bundle.length; k++)
=======
    for(var k = 0; k < $scope.text.bundle.length; k++)
>>>>>>> origin/master
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
<<<<<<< HEAD
        $scope.text.rec.push($scope.bundle[k]["value"]); 
=======
        $scope.text.rec.push($scope.text.bundle[k]["value"]); 
>>>>>>> origin/master
      }
      
    } 

<<<<<<< HEAD
    console.log($scope.text.rec);      
=======
    console.log($scope.rec);      
>>>>>>> origin/master
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
<<<<<<< HEAD
$scope.text.token = $window.localStorage['buddysms-app-token'];
$scope.info = [$scope.text, $scope.animals]
  $scope.sendText = function()
  {
    $http.post('/message' ,$scope.text ,
      {headers : {Authorization: 'Bearer ' + auth.getToken()}})
    .then(function(response){
      console.log($scope.text);
    

      });
   }
});
=======
  
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
	           .then(function(response){
	           	$scope.rey = response.data.status_code;
	           	$scope.dope = response;
			 console.log($scope.dope);
	           	console.log($scope.rey);
	           	console.log($scope.text);
	           	
	           	if($scope.rey > 299)
	           	{
	           	$http.post('/authenticateText')
		 	.then(function(response){
		          console.log(response);
		          $scope.token = response.data.payload;
		          console.log($scope.token);
		          $scope.smstok = $scope.token.access_token;
		          console.log($scope.smstok);
		          $window.localStorage.access_token = $scope.smstok;
		          console.log($window.localStorage.access_token);
			$scope.text.token = $window.localStorage.access_token;
		         $http.post('/message' , $scope.text , 
		        {headers : {Authorization: 'Bearer ' + auth.getToken()}})
	                 .then(function(response){
	                	$scope.repy = response.data;
	                 	console.log($scope.repy);
	                 	console.log($scope.text);
	                 	
	                 });
		      });	
	           	}
	           });
	        
      	}
      };
      
      	
      	         
     

});
>>>>>>> origin/master
