module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'hw1/test/**/*.js'
        ],
        preprocessors: {
            'hw1/test/**/*.js': ['webpack', 'sourcemap'],
        },
        webpack: require('./webpack.config.test'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['mocha', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        port: 9876,
        browsers: ['Firefox'], // или Chrome
        captureTimeout: 20000,
        singleRun: true,
        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-webpack'),
            require('karma-mocha-reporter'),
            require('karma-firefox-launcher'),
            require('karma-chrome-launcher'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-sourcemap-loader')
        ]
    });
};
