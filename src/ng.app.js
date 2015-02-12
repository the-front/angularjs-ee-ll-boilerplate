define(function(require) {
  'use strict';

  console.log( window.location );

  var angular = require('angular');

  window.ngee = {
    oldLocation: angular.copy( window.location )
  };
  console.log( ngee.oldLocation );

  angular.element(document).ready(startAngularApp);

  //---

  function startAngularApp() {

    console.log('bootstrap angular application');

    // define run module to bootstrap application
    var module = angular.module(
      // module name
      'run',

      // module dependencies
      [
        // enable mock and intercep $HTTP requests
        require('./require.mock.load').name,

        require('app/core/package').name
      ]
    );

    // start angular app
    angular.bootstrap(document, [module.name]);

  }

});
