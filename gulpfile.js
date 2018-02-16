var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var webpack = require("webpack-stream");

// Static server
gulp.task("browser-sync-dev", function() {
    browserSync.init({
        server: {
            baseDir: "./build",
            notify: false
        }
    });

    gulp.watch("build/**/*").on("change", reload);
});

gulp.task("webpack", function() {
    return gulp
        .src("src/js/index.js")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("build/"));
});


gulp.task("webpack-watch", function() {
    gulp.watch("src/**/*", ["webpack"]);
});

