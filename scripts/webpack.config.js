const { optimize } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const overrideGlobal = require('./overrideGlobal')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { compact } = require('lodash')

const isProd = process.env.NODE_ENV === 'production'
const root = resolve(__dirname, '../dist')

module.exports = {
  entry: resolve(__dirname, '../src/xflex.js'),
  output: {
    path: root,
    filename: isProd ? 'xflex.min.js' : 'xflex.js',
    library: 'xflex',
    libraryTarget: 'umd',
  },
  target: 'web',
  plugins: compact([
    new CleanWebpackPlugin([root], {
      root,
      dry: false,
      verbose: false,
    }),
    overrideGlobal(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `stats${isProd ? '' : '.dev'}.html`,
      logLevel: 'error',
      openAnalyzer: false,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),

    isProd &&
      new optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
      }),
  ]),
  devtool: 'source-map',
  externals: {
    react: 'react',
    'prop-types': 'prop-types',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
}
