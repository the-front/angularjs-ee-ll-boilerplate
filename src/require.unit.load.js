define(function(require) {
  'use strict';

  require('shared/fend/progressbar-loading/tests/unit/package');
  require('shared/fend/input-utils/tests/unit/package');
  require('shared/fend/navbar/tests/unit/package');
  require('shared/fend/pagination/tests/unit/package');

  require('app/core/package.unit');

  require('app/modules/pages/package.unit');
  require('app/modules/useCases/package.unit');


  // TODO: add here tests unit module to load


});
