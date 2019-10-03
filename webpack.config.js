var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        main: './apps/frontend/src/index.jsx',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.resolve('./apps/frontend/static/frontend'),
        filename: "[name]-[hash].js",
    },
    plugins: [
        new BundleTracker({filename: './var/webpack-stats.json'}),
        new ExtractTextPlugin('[name]-[hash].css'),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            }
        ]
    },
};