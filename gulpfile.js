var gulp = require('gulp');
var pocoGen = require('./src/index').default;

gulp.task('poco', function () {
  var pocoGenOptions = {
     
  };

  return gulp.src(['../The Loan Company/TLC/src/OM.Data.DomainModels/**/*.cs', '!../The Loan Company/TLC/src/OM.Data.DomainModels/obj/**'])
              .pipe(pocoGen(pocoGenOptions))
              .pipe(gulp.dest('Samples'));
})