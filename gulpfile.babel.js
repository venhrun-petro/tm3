import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'

gulp.task('hugo-build-uk', shell.task(['hugo21']))

gulp.task('hugo-build-au', shell.task(['hugo21 --config="config-au-gulp.toml" --canonifyURLs --destination="./public/au"']))

gulp.task('minify-html', () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('build', ['hugo-build-uk', 'hugo-build-au'], (callback) => {
  runSequence('minify-html', callback)
})
