const webpack = require('webpack');
const merge = require('webpack-merge');
const NoConsolePlugin = require('no-console-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SERVERURI': JSON.stringify('https://mapitout-server.herokuapp.com')
      }
    }),
    new NoConsolePlugin({
      ignores: [
        'log',
        'info',
        'warn',
        'error'
      ]
    })
  ]
})