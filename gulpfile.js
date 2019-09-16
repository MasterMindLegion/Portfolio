// Gulp Structure

// 1.====== load modules
const gulp = require('gulp');
// for deleting files
const del = require('del');
// minify html
const htmlmin = require('gulp-htmlmin');
// browserSync server
const browsersync_server = require('browser-sync').create();


// 2.======== declare functions

// deletes all assets (HTML, fonts, images) in dist
function cleanAssets(done) {
  return del(
      ['dist/**/*.html', 'dist/fonts/**/*', 'dist/img/**/*'], 
      { force: true }
  );
}

// publish HTML files src into dist
function publishHtml(done, for_production = false) {
  let pipeline = gulp.src('src/**/*.html');

  if (for_production) {
      pipeline.pipe(htmlmin({ collapseWhitespace: true }));
  }

  return pipeline.pipe(gulp.dest('dist'));
}

// publish HTML for production
function publishHtmlProduction(done) {
  return publishHtml(done, true);
}

// publish HTML for development
function publishHtmlDevelopment(done) {
  return publishHtml(done, false);
}

// Copy all fonts from src/fonts into dist
function publishFonts(done) {
  return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
}

// Copy all images from src/img into dist
function publishImages(done) {
  return gulp.src('src/img/**/*')
      .pipe(gulp.dest('dist/img'));
}

// watch files
function watchFiles(done) {
  gulp.watch("src/**/*.html", gulp.series(publishHtml, reload));
}

// browserSync server
function serve(done) {
  browsersync_server.init({
      server: {
          baseDir: './dist/'
      }
  });
  done();
}

// browserSync reload
function reload(done) {
  browsersync_server.reload();
  done();
}

// 3.======== define complex tasks

// 4.========== export tasks
exports.publish = gulp.series(cleanAssets, publishHtml, publishFonts, publishImages);
exports.build   = gulp.series(cleanAssets, publishHtmlProduction,  publishFonts, publishImages);
exports.watch   = gulp.series(cleanAssets, publishHtml, serve, watchFiles);



