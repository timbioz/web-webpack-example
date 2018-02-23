var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var webpack = require("webpack-stream");

// TODO: Migrate to Gulp 4 version

gulp.task("default", ["browser-sync-dev"]);

// Static server
gulp.task("browser-sync-dev", function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        reloadDelay: 2000,
        debounceDelay: 2000,
        notify: true
    });

    gulp.watch("build/**/*").on("change", reload);
});

gulp.task("bs-reload", function() {
    return browserSync.reload("./build/**/*");
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
