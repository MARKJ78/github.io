var path = require('path'); //npm init includes 'path' module

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: 'dist',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /[node_modules]/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};
