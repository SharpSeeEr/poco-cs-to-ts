var gulp = require('gulp');
var pocoGen = require('typescript-cs-poco').default;
var concat = require('gulp-concat');

gulp.task('poco', function () {
  var pocoGenOptions = {
     
  };

  return gulp.src(['../path/to/cs/models/**/*.cs', '!../path/to/files/to/exclude/obj/**'])
              .pipe(concat('models.js'))
              .pipe(pocoGen(pocoGenOptions))
              .pipe(gulp.dest('out/put/path'));
})