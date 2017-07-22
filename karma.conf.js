// // Karma configuration
// Generated on Mon Sep 12 2016 19:21:06 GMT+0800 (中国标准时间)
const path = require('path');
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
      //'src/**/*-test.js'
    ],
    exclude: [],
    preprocessors: {
      'tests.webpack.js': ['webpack']
      //'src/**/*-test.js': ['webpack']
    },
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'test/coverage/',
      reporters: [
          { type: 'html' },
          { type: 'text'},
          { type: 'text-summary' }
      ]
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['istanbul']
          }
        }]//,
        // preLoaders: [{
        //   test: /\.jsx?$/,
        //   include: [path.resolve('src/')],
        //   loader: 'isparta'
        // }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  })
}