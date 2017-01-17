const path = require('path'); //npm init includes 'path' module
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var imageWebpackLoader = require('image-webpack-loader');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file?name=[name].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']
            }
        ]
    },
    imageWebpackLoader: {
        mozjpeg: {
            quality: 60
        },
        pngquant: {
            quality: "65-90",
            speed: 4
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({title: 'home page', template: './src/index.ejs'}),
        new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'})
    ]
};
