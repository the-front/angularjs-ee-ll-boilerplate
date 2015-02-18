module.exports = function() {
  'use strict';

  //----------------------------------------------------------------------------

  var path = require('path');

  var getIpAddress = require('./helpers/lib/localip');

  var oscheck = require('./helpers/lib/oscheck');

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
      findModules: defineFindModules()
    },

    html2js: defineHtml2js()

  }; // @end: frontend

  function defineFindModules() {
    return oscheck.isWin ? {
        source        : path.resolve(path.join(paths.src, 'app', 'modules')),
        fileMatch     : /package\.js$/,
        removeBase    : path.resolve(path.join('..', 'src')),
        mainModule    : 'ng.app',
        excludeModule : 'require.build.config',
        ignoreMatch   : /lazy\\load|mock|tests\\unit/
      } : {
        source        : paths.src + '/app/modules',
        fileMatch     : /package\.js$/,
        removeBase    : '../src/',
        mainModule    : 'ng.app',
        excludeModule : 'require.build.config',
        ignoreMatch   : /lazy\/load|mock|tests\/unit/
      };
  }

  function defineHtml2js() {
    return oscheck.isWin ? {
      source      : path.resolve(path.join(paths.src, 'app')),
      destination : paths.build,
      fileMatch   : /package\.js$/,
      ignoreMatch : /lazy\\load|mock|tests\\unit/,
      // ignorePath  : 'tests/unit',
      // ignorePath  : '!',
      removeBase  : path.resolve(path.join(paths.src, 'app'))
    } : {
      source        : paths.src + '/app',
      destination   : paths.build,
      fileMatch     : /package\.js$/,
      ignoreMatch   : /lazy\/load|mock|tests\/unit/,
      // ignorePath    : 'tests/unit',
      // ignorePath    : '!',
      removeBase    : paths.src + '/app'
    };
  }

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
