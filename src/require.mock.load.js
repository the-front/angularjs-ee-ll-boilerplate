define(function(require) {
  'use strict';

  var module = require('shared/mock/package');

  //-------------------
  // @begin: load mocks

  require('app/modules/pages/package.mock');
  require('app/modules/useCases/package.mock');

  // TODO: add here mock module to load


  // @end: load mocks
  //-------------------
  // return mock module
  return module;

});
