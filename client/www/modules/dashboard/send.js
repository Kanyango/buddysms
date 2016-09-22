angular.module('buddySms.send' , ['ngTagsInput','typeahead'])

.config(function($httpProvider)
{
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
})
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
            
            $scope.authParams = 
		      { 
		        "type" : "access_token",
		        "username" : "Dave",
		        "password" : "androidapps"
		      }
      
      $scope.testAuth = function()
      {
      	if(!!$window.localStorage.access_token)
      	{
         $http.post('/authenticateText')
         .then(function(response){
          console.log(response);
          $scope.token = response.data;
          console.log($scope.token);
          $scope.smstok = $scope.token.payload;
          console.log($scope.smstok);
          $window.localStorage.access_token = $scope.smstok;
          console.log($window.localStorage.access_token.access_token);
        });	
      	}
      	else
      	{
      		$scope.sendText = function()
		  {
		    $http.post('/message' ,$scope.text)
		    .then(function(response){
		      $scope.text = {};
		      $scope.chars = {};
		      $scope.messages = {};
		      });
		   }
      	}
      
      };
      

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
    $scope.rec = [];
    for(var k = 0; k < $scope.text.bundle.length; k++)
    {
      //console.log($scope.bundle[k]["value"]);

      //$scope.rec.push($scope.bundle[k]["value"]);

    if(angular.isArray($scope.text.bundle[k]["value"]))
      {
        for(var l = 0; l < $scope.text.bundle[k]["value"].length; l++)
        {
          //console.log($scope.bundle[k]["value"][l]["value"]);

          console.log($scope.text.bundle[k]["value"][l]["value"]);

           $scope.rec.push($scope.text.bundle[k]["value"][l]["value"]);

        }
      }
      else
      {
        $scope.rec.push($scope.text.bundle[k]["value"]); 
      }
      
    } 

    console.log($scope.rec);      
    $scope.ceci = $scope.rec.length;
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

});
