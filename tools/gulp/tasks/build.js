module.exports = function(gulp, $) {

  gulp.task('build', function( done ) {

    $.runSequence(
      'copy:js2build',
      'html2js', // TODO: review
      'update:main:package.js', // TODO: needed?
      'requirejs',
      'build:concat:js',
      'clean:build',
      [
        'styles',
        'build:min:index.html',
        'copy:vendor2dist',
        'build:min:images',
        'clean:dist:unused-files'
      ],
      done
    );

  });

  gulp.task('build:min:index.html', function() {
    return gulp.src( $.config.html.index )
      .pipe( $.htmlmin( $.config.htmlmin ) )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

  gulp.task('build:min:images', function() {
    return gulp.src( $.config.paths.src + '/shared/img/**/*' )
      .pipe( $.imagemin({
        progressive: true,
        interlaced: true
      }) )
      .pipe( gulp.dest( $.config.paths.dist + '/shared/img' ) );
  });

  gulp.task('build:concat:js', function() {
    return gulp.src([
        $.config.paths.dist + '/' + $.config.require.mainModule + '.js',
        $.config.require.config
      ])
      .pipe( $.concat( 'require.config.js' ) )
      .pipe( $.uglify() )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

};
