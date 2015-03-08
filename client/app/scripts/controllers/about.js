'use strict';

/**
 * @ngdoc function
 * @name beltloopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beltloopApp
 */
angular.module('beltloopApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
