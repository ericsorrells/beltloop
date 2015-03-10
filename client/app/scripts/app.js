'use strict';

/**
 * @ngdoc overview
 * @name beltloopApp
 * @description
 * # beltloopApp
 *
 * Main module of the application.
 */
angular
  .module('beltloopApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive'
    'ng-token-auth'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('sign_in', {
        url: '/sign_in'
        templateUrl: 'views/user_sessions/new.html',
        controller: 'UserSessionsCtrl'
      })
      .state('sign_up', {
        url: '/sign_up'
        templateUrl: 'views/user_registrations/new.html',
        controller: 'UserRegistrationsCtrl'
      })
      .state('itineraries', {
        url: '/itineraries'
        templateUrl: 'views/itineraries/itineraries.html',
        controller: 'ItinerariesCtrl',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      });
    $urlRouterProvider.otherwise('home');
  })
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('auth:login-success', function() {
      $state.go('/');
    });
  }]);
