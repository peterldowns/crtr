const path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: {
        index: './client/index.jsx',
    },
    output: {
        path: path.resolve('static/js'),
        pathinfo: true,
        filename: 'index.js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
    }
};
