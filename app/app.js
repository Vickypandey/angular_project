'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ui.router','myApp.controllers', 'myApp.services', 'myApp.directives', 'angucomplete-alt','ngTouch','ngMaterial',  'checklist-model', 'md.data.table', 'fixed.table.header', 'angular-toArrayFilter']) 

// .run(function($rootScope,$state) {
//   $rootScope.$on('api:ready', function (event) {
   
//   });
// })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      // .state('app',{
      //   url:"/app",
      //   abstract: true,
      //   templateUrl:'templates/left-menu.html',
      //   controller: 'AppCtrl'
      // })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl as ctrl',
        authenticate: true
        // authenticated = true
      })

      .state('company-details', {
        url: '/company-details',
        templateUrl: 'partials/company-details.html',
        controller: 'CompanyCtrl'
      })

      .state('table', {
        url: '/table',
        templateUrl: 'partials/table.html',
        controller: 'tableCtrl'
      })

      .state('connect', {
        url: '/connect',
        templateUrl: 'partials/connect.html'
      })
      // .state('app.superAdmin', {
      //   url: '/buildingList',
      //   views: {
      //     'main-content': {
      //       templateUrl: 'partials/building-list.html',
      //       controller: 'BuildingListCtrl'
      //     }
      //   }
      // })
      // .state('app.city', {
      //   url: '/cityList',
      //   views: {
      //     'main-content': {
      //       templateUrl: 'partials/city.html',
      //       controller: 'CityCtrl'
      //     }
      //   }
      // })
      
     
       

     

   

      
      // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/reports');
  //$urlRouterProvider.otherwise('/appointment');
   // $urlRouterProvider.otherwise('/login');
  $urlRouterProvider.otherwise('/login');
})

.run(function($rootScope, $location, $state, authFact){
		$rootScope.$on('$routeChangeStart', function(event, next, current){
			if (next.$$route.authenticated){
				var userAuth = authFact.getAccessToken();
				if(!userAuth){
					$state.go('/login');

				}

			}
		});
})

window.fbAsyncInit = function() {
    FB.init({
      appId      : '243065762850351',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));




