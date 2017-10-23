var webpackConfig = require('./webpack.config.test')({ isTest: true });
var path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/jquery/dist/jquery.js',            
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/jquery.scrollbar/jquery.scrollbar.js',
            'src/main.test.js'
        ],
        preprocessors: {
            'src/main.test.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        customLaunchers: {
            Chrome_with_debugging: {
                base: 'Chrome',
                chromeDataDir: path.resolve(__dirname, '.chrome')
            }
        },
        singleRun: false,
        browserNoActivityTimeout: 60000,
        concurrency: Infinity,
        client: {
            captureConsole: true
        }
    });
};
