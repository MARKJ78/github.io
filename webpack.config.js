var path = require('path'); //npm init includes 'path' module
module.exports = {
    entry: './src/js/main.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
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
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            }
        ]
    },
    /*plugins: [
       new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })
   ]*/

  };
