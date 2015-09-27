var gulp = require('gulp');
var paths = require('../paths');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var minifyCSS = require('gulp-minify-css');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('build-less', function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(minifyCSS())
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.less_out));
});