(function () {
  'use strict';

angular.module('myApp.controllers', []) 

.controller('LoginCtrl', function($scope, $state, authFact,$location, googleService) {
  $scope.login = function(){
    // $state.go('home');
  }

 $scope.GLogin = function () {
                googleService.login().then(function (data) {
                    // do something with returned data
                    console.log(data.email);
                }, function (err) {
                    console.log('Failed: ' + err);
                });
            };

  $scope.FBLogin = function() {
    FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       console.log(response);

       var accessToken  = FB.getAuthResponse().accessToken;
       console.log(accessToken);
       authFact.setAccessToken(accessToken);

       $state.go('home');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});
  }
 

})





.controller('HomeCtrl', function($scope, $timeout, $q, $log, $state) {

    // $scope.companyList = [
    //   {name:"Google india pvt Ltd"}, 
    //   {name:"Microsoft india pvt Ltd"},
    //   {name:"Oracle India Pvt Ltd"},
    //   {name:"VMware"} ,
    //   {name:"Tata Consultancy Services"}, 
    //   {name:"Wipro Technologies Limited"}, 
    //   {name:"Trigent Software Ltd"},
    //   {name:"Infosys Technologies Ltd"},
    //   {name:"Tech Mahindra"},
    //   {name:"HCL Technologies Ltd"},
    //   {name:"Honeywell Technology Solutions Lab Pvt Ltd"} ,
    //   {name:"IBM India Pvt Ltd"}

    // ];
  
var self = this;
           self.simulateQuery = false;
           self.isDisabled    = false;
           // list of states to be displayed
           self.states        = loadStates();
           self.querySearch   = querySearch;
           self.selectedItemChange = selectedItemChange;
           self.searchTextChange   = searchTextChange;
           self.newState = newState;
           function newState(state) {
              alert("This functionality is yet to be implemented!");
           }    
           function querySearch (query) {
              var results = query ? self.states.filter( createFilterFor(query) ) : self.states, deferred;
              if (self.simulateQuery) {
                 deferred = $q.defer();
                 $timeout(function () { 
                       deferred.resolve( results ); 
                    }, 
                Math.random() * 1000, false);
                 return deferred.promise;
              } else {
                 return results;
              }
           }
           function searchTextChange(text) {
              $log.info('Text changed to ' + text);
           }
           function selectedItemChange(item) {
              $log.info('Item changed to ' + JSON.stringify(item));
           }
           //build list of states as map of key-value pairs
           function loadStates() {
              var allStates = 'Indian Oil Corporation, Reliance Industries, Tata Motors, State Bank of India, Bharat Petroleum,Google,\
                 Bharat Heavy Electricals, Bharti Airtel, Abacus Inc., Accenture Services Pvt. Ltd., Accord Software & Systems Pvt. Ltd., Alliance Semiconductor (India) Pvt. Ltd.,\
                 Microsoft, Microland, Oracle, VMvare, Primefocus, SAP, Times Inc, Facebook,Infosys, Tata Consultancy Services, Wipro, HCL Technologies\
                 IBM India Pvt Ltd., Mindtree, Maruti Suzuki, Tech Mahindra, Ericsson,Hewlett Packard, Symantec,\
                 Lupin, Nintendo, EMC, Dell, Global Logic, Vodafone Nokia Siemens Networks, Delloite';
              return allStates.split(/, +/g).map( function (state) {
                 return {
                    value: state.toLowerCase(),
                    display: state
                 };
              });
           }
           //filter function for search query
           function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(state) {
                 return (state.value.indexOf(lowercaseQuery) === 0);
              };
           }

           $scope.search = function() {
            $state.go('company-details');
           }
     

 

})

.controller('CompanyCtrl', function($scope, companydetailService, $mdDialog){

 
var companyArray = [];

$scope.companyArray = companydetailService.getCompanydetail();
// console.log($scope.companyArray);






  // $scope.companyDetails = companydetails.partial();

  // console.log($scope.companyDetails);


  // $scope.showAdvanced = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'partials/connect.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true
  //   })
  //   .then(function(answer) {
  //     $scope.status = 'You said the information was "' + answer + '".';
  //   }, function() {
  //     $scope.status = 'You cancelled the dialog.';
  //   });
  // };



  // function DialogController($scope, $mdDialog, companydetails) {
  //   $scope.hide = function() {
  //     $mdDialog.hide();
  //   };

  //   $scope.getNumber = companydetails.get;

  //   $scope.cancel = function() {
  //     $mdDialog.cancel();
  //   };
  // }

  

})


.controller('tableCtrl', function($scope) {

 

})





 
})();