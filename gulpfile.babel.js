import gulp from 'gulp';
import browserSync from 'browser-sync';

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
};

function bsync(done) {
  server.init({
    server: {
      baseDir: './build'
    },
    open: false,
    notify: false
  });
  done();
};

const watch = () => gulp.watch("build/**/*", reload);

export const serve = gulp.series(bsync, watch);