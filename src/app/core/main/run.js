define(function(require) {
  'use strict';

  var module = require('./module');

  module.run(runner);

  //---

  runner.$inject = [ 'LazyLoadService', 'ProgressConfig', 'MenuConfig', '$location' ];

  function runner( lazyLoad, progressConfig, menu, $location ) {

    //--- @begin: loading progressbar config
    progressConfig.eventListeners();
    progressConfig.color('#428bca');
    progressConfig.height('3px');
    //--- @end: loading progressbar config

    //--- @begin: menu items
    menu.addMenuItem('Home', 'home');
    menu.addMenuItem('Bookmarks', 'bookmarks');


    // TODO: add here new item


    menu.addMenuItem('About', 'about');
    menu.addMenuItem('Help', 'help', 'right');
    //--- @end: menu items

    // TODO: review

    lazyLoad
      .load(['pages', 'useCases'])
      .then(function( results ) {
        console.log( 'modules loaded...' );
        console.log( results );


        if(ngee && ngee.oldLocation) {
          var urlParts = ngee.oldLocation.href.split('#');
          var path = $location.path();
          if( urlParts.length > 1 && ( path !== urlParts[1] ) ) {
            $location.path( urlParts[1] );
          }
        }

      });


  }

});
