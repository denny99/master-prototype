var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
  entry: {
    swaggerDocs: path.resolve(__dirname,
        'src/main/webapp/resources/js/swaggerDocs.js'),
    index: path.resolve(__dirname,
        'src/main/webapp/resources/js/react/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'src/main/webapp/resources/dist'),
    filename: '[name]Bundle.js',
    publicPath: 'resources/dist',
  },
  module: {
    loaders: [
      // JSX/ES6 handling with babel
      // * babel-loader: uses Babel to transform your JSX/ES6 JavaScript to ECMAScript 5
      // * react-hot: Reloads your React Component on code changes without loosing the application state
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'react'],
          plugins: ['transform-class-properties'],
        },
      },
      // CSS handling
      // * style-loader: Embeds referenced CSS code using a <style>-element in your index.html file
      // * css-loader: Parses the actual CSS files referenced from your code. Modifies url()-statements in your
      //   CSS files to match images handled by url loader (see below)
      {
        test: /\.css$/,
        loader: 'style.loader!css',
      },

      // Image Handling
      // * url-loader: Returns all referenced png/jpg files up to the specified limit as inline Data Url
      //   or - if above that limit - copies the file to your output directory and returns the url to that copied file
      //   Both values can be used for example for the 'src' attribute on an <img> element
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=25000',
      },

      // JSon file handling
      // * Enables you to 'require'/'import' json files from your JS files
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  stats: {

    // Nice colored output
    colors: true,
  },
  devtool: 'source-map',
};