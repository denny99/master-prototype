let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let commonConfig = require('./webpack.common.js');
let helpers = require('./helper');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('src/main/webapp/resources/dist'),
    publicPath: '/resources/dist/',
    filename: '[name].js',
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
});