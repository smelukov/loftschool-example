module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap'],
        },
        webpack: require('./webpack.config.test'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['mocha'],
        port: 9876,
        browsers: ['Firefox', 'Chrome'],
        captureTimeout: 20000,
        singleRun: false,
        plugins: [
            require('karma-mocha'),
            require('karma-webpack'),
            require('karma-mocha-reporter'),
            require('karma-firefox-launcher'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader')
        ]
    });
};
