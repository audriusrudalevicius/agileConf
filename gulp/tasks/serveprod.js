var gulp = require('gulp');
var connect = require('gulp-connect');
var paths = require('../paths');
gulp.task('serveprod', ['build'], function() {
    connect.server({
        root: ['./'],
        port: process.env.PORT || 5000, // localhost:5000
        livereload: false
    });
});