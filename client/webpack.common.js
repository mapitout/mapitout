const webpack = require('webpack');
const path = require('path');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app.js'),
    'vendor.js': [
      'react', 'react-dom', 'redux', 
      'react-redux', 'react-router-dom', 'redux-form', 'redux-thunk',
      'axios', 'prop-types', 'lodash',
      'react-map-gl', 'react-recaptcha'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: "js/[name].[chunkhash].js",
    publicPath: '/'
  },
  // resolve: {
  //     "alias": {
  //     "react": "preact-compat",
  //     "react-dom": "preact-compat"
  //     }
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },'sass-loader'],
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      { 
        test: /\.json$/, 
        loader: 'json-loader' 
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.html')}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: "manifest.js",
      chunks: ['vendor', 'vendor.js'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'styles/style.[hash].css'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/assets'), to: 'assets' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'MAPBOX_API_KEY': JSON.stringify('pk.eyJ1IjoiYW1hemluZ2FuZHl5eSIsImEiOiJjamZqM25pZGYwamRvMnFvM3RsMTFyZDFzIn0.1YaQZ-Y0SXLmwfs0vQtO7w')
      }
    })
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}