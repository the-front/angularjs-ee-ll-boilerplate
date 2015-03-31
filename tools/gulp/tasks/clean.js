module.exports = function(gulp, $) {

  gulp.task('clean:build', function( done ) {
    $.del([
      $.config.paths.build
    ], done);
  });

  gulp.task('clean:dist', function( done ) {
    $.del([
      $.config.paths.dist
    ], done);
  });

  gulp.task('clean:dist:unused-files', function( done ) {
    $.del([
      $.config.paths.dist + '/{build.txt,ng.app.js}'
    ], done);
  });

  gulp.task('clean', ['clean:dist', 'clean:build']);

};
