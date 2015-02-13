module.exports = function() {
  'use strict';

  //----------------------------------------------------------------------------

  var getIpAddress = require('./helpers/lib/localip');

  var karma = require('./config.karma');

  //----------------------------------------------------------------------------

  var paths = {

    editorconfig: '../.editorconfig',
    src: '../src',
    build: '.temp',
    dist: '../dist',                    // production files
    reports: '../' + karma.reportsDir,  // karma reports output
    templates: 'templates'

  }; // @end: paths

  //----------------------------------------------------------------------------

  var frontend = {

    webhost: getIpAddress(),

    webserver: 1337,
    livereload: 9337, // default: 35729

    requirejs: {
      findModules: {
        source: paths.src + '/app/modules',
        fileMatch: /package\.js$/,
        removeBase: '../src/',
        mainModule: 'ng.app',
        excludeModule: 'require.build.config',
        ignoreMatch   : /lazy\/load|mock|tests\/unit/,
      }
    },

    html2js: {
      source        : paths.src + '/app',
      destination   : paths.build,
      fileMatch     : /package\.js$/,
      ignoreMatch   : /lazy\/load|mock|tests\/unit/,
      // ignorePath    : 'tests/unit',
      // ignorePath    : '!',
      removeBase    : paths.src + '/app'
    }

  }; // @end: frontend

  //----------------------------------------------------------------------------

  // config proxy to application backend
  var backend = {

    host: 'localhost',
    port: 9000,
    context: 'rest'

  }; // @end: backend

  //----------------------------------------------------------------------------

  return {
    karma:      karma,
    paths:      paths,
    frontend:   frontend,
    backend:    backend
  };

};
