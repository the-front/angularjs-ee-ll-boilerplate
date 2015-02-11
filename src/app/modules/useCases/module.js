define(function(require) {
  'use strict';

  var angular = require('angular');

  // angular module definition
  return angular.module(
    // module name
    'useCases',

    // module dependencies
    [
      require('./bookmarks/package').name
    ]
  );

});
