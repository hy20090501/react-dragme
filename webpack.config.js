// webpack.config.js

var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap'
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    }
};