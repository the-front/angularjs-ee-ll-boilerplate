module.exports = function(gulp, $) {

  gulp.task('html2js', function() {

    var srcPath = $.path.resolve( $.config.paths.src ) + $.path.sep;

    var locations = [];

    return gulp.src([
        $.config.paths.src + '/app/{core,modules}/**/package.js',
        '!' + $.config.paths.src + '/app/{core,modules}/*{,*/**}/{tests,mock}/**/*.js'
      ], { read: false })
      .pipe( $.through2.obj(
        function contents( file, enc, next ) {

          locations.push(
            file.path.replace(srcPath, '').replace('package.js','')
          );

          next();
        },
        function end( done ) {

          $.html2js
            .makeCache({
              source: $.config.paths.src,
              destination: $.config.paths.build,
              locations: $.html2js.checkLocations( locations )
            })
            .then(function(results) {
              // console.log( results );
              done();
            });

        }
      ) );

  });

};
