define(function(require) {
  'use strict';

  var angular = require('angular');

  // angular module definition
  return angular.module(
    // module name
    'pages',

    // module dependencies
    [
      require('./about/package').name,
      require('./help/package').name
    ]
  );

});
