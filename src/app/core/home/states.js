define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'master': {
            templateUrl   : 'app/core/main/templates/layout.html'
          },
          'content@home': {
            templateUrl   : 'app/core/home/template.html',
            controller    : 'HomeCtrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
