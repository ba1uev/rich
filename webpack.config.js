var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  // devtool: 'eval',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  watch: NODE_ENV === 'dev',
  watchOptions: {
    aggregateTimeout: 100 // default 300
  },
  devtool: NODE_ENV == 'dev' ? 'cheap-inline-module-source-map' : null,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify('ru')
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style!css!sass!'
    }]
    // loaders: [{
    //   test: /\.js$/,
    //   loaders: ['react-hot', 'babel'],
    //   include: path.join(__dirname, 'src')
    // }]
  }
};
