let gulp = require('gulp');
let browserSync = require('browser-sync');

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}
function bsync(done) {
  server.init({
    server: {
      baseDir: './build'
    },
    open: false,
    notify: false
  });
  done();
}
let watch = () => gulp.watch("build/**/*", reload);

let serve = gulp.series(bsync, watch);

exports.serve = serve;