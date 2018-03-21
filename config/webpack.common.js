let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helper');
module.exports = {
  entry: {
    'polyfills': './src/main/webapp/angular/polyfills.ts',
    'app': './src/main/webapp/angular/main.ts',
    'swaggerDocs': './src/main/webapp/resources/js/swaggerDocs.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {configFileName: helpers.root('config', 'tsconfig.json')},
          }, 'angular2-template-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'react'],
          plugins: ['transform-class-properties'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]',
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'main/webapp/angular'),
        loader: ExtractTextPlugin.extract(
            {fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'}),
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'main/webapp/angular'),
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('./src/main/webapp/angular'), // location of your src
        {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/angular/index.html',
      filename: helpers.root('src', 'main/webapp/index.html'),
      chunks: ['polyfills', 'app'],
    }),
  ],
};