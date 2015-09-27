var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var tsd = 'tsd_typings/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: appRoot + 'styles/**/*.css',
  images: appRoot + 'images/*',
  images_out: outputRoot + 'images',
  less: appRoot + 'less/**/*.less',
  less_out: outputRoot + 'styles/',
  ts: appRoot + '**/*.ts',
  ts_tsd: tsd + '**/*.ts',
  output: outputRoot,
  output_ts: outputRoot,
  maps: './maps',
  doc:'/doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
