var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload      = browserSync.reload;
// Static server
gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            notify: false
        }
    });

    gulp.watch("dist/**/*").on("change", reload);
});

