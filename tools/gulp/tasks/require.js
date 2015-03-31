module.exports = function(gulp, $) {

  var requirejs = require('requirejs');

  //----------------------------------------------------------------------------

  /*
    http://tech.pro/blog/1639/using-rjs-to-optimize-your-requirejs-project

    http://requirejs.org/docs/optimization.html

    https://github.com/jrburke/r.js/blob/master/build/example.build.js

    https://github.com/CaryLandholt/AngularFun/blob/master/Gruntfile.coffee
  */

  // https://github.com/kvindasAB/angular-enterprise-kickstart/blob/master/Gruntfile.js#L303
  var requireBuildConfig = {

    mainConfigFile: $.config.require.build,

    removeCombined: true,
    findNestedDependencies: true,

    baseUrl: './',
    appDir: $.config.paths.build, // source dir
    dir: $.config.paths.dist, // ouput dir

    useStrict: true,
    wrap: {
      start: '(function() {\'use strict\';',
      end: '})();'
    },
    optimize: "uglify2",
    uglify2: {
      mangle:                 true,
      compress: {
        'drop_console':       true,
        'drop_debugger':      true,
        'dead_code':          true,
        'join_vars':          true,
        'if_return':          true,
        'negate_iife':        true,
        booleans:             true,
        loops:                true,
        unused:               true
      }
    }
  };

  //----------------------------------------------------------------------------

  gulp.task('requirejs', ['requirejs:rewrite-config'], function() {

    var srcPath = $.path.resolve( $.config.paths.src ) + $.path.sep;

    var modules = [{name: $.config.require.mainModule}];

    return gulp.src([
        $.config.paths.src + '/app/modules/**/package.js',
        '!' + $.config.paths.src + '/app/modules/*{,*/**}/{tests,mock}/**/*.js'
      ], { read: false })
      .pipe( $.through2.obj(
        function contents( file, enc, next ) {

          modules.push({
            name: file.path.replace(srcPath, '').replace('.js',''),
            exclude: [ $.config.require.excludeModule ]
          });

          next();
        },
        function end( done ) {
          requireBuildConfig.modules = modules;
          $.requirejs.builder( requireBuildConfig, done, $.is.debug, $.log );
        }
      ) );

  });

  //----------------------------------------------------------------------------

  gulp.task('requirejs:rewrite-config', function() {
    return gulp.src( $.config.require.config )
      .pipe( $.requirejs.rewriteConfig() )
      .pipe( gulp.dest( $.config.paths.build ) );
  });

};
