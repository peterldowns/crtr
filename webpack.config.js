const path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: {
        index: './client/index.jsx',
        home: './client/home.jsx',
    },
    output: {
        path: path.resolve('static/js'),
        pathinfo: true,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
    }
};
