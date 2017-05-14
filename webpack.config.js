const path = require('path');
module.exports = {
    entry: {
        index: './client/index.jsx',
    },
    output: {
        path: path.resolve('static/js'),
        filename: 'index.js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
    }
};
