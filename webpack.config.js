const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js' ],
  },
  module: {
    
  },
  plugins: [
    
  ],
  performance: false,
  node: {
    fs: 'empty'
  }
}