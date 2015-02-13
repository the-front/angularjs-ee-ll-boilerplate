define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('MainCtrl', MainCtrl);

  //---

  MainCtrl.$inject = ['ProgressConfig', 'MenuConfig', 'LazyLoadService', '$location'];

  function MainCtrl(progressConfig, menu, lazyLoad, $location) {
  // function MainCtrl() {
    var vm = this;


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

    lazyLoad
      .load(['pages', 'useCases'])
      .then(function( results ) {

        console.log( 'modules loaded...' );
        console.log( results );

        // TODO: review
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
