var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var paths = require('../paths');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true,
    typescript: typescript,
    target: 'es5',
    module: 'amd'
});

gulp.task('build-ts', function() {
    var tsResult = gulp.src([paths.ts, paths.ts_tsd])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts
            .pipe(gulp.dest(paths.output_ts)),
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.output_ts))
    ]);
});