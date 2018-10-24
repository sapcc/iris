const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const SaveHashes = require('assets-webpack-plugin');

module.exports = {
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /(\.scss|\.css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.js|.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ],
            "plugins": ["@babel/transform-runtime", "@babel/proposal-class-properties"]
          }
        }
      }, {
        test: /\.(ico|png|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader'
      },
      { test: /\.jade$/, loader: 'jade-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    proxy: {
      '*': 'http://localhost:80'
    }
    // proxy: {
    //   '/api': 'http://localhost:80',
    //   '/system/liveliness': 'http://localhost:80',
    //   '/system/readiness': 'http://localhost:80'
    // }
  },
  plugins: [
    new Dotenv({systemvars: true}),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({template: 'src/templates/index.html', filename: 'index.html'}),
    // new HtmlWebpackPlugin({template: 'src/templates/layout.jade', filename: 'index.html'}),
    new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[name].[contenthash].css"}),
    // asstes manifest for express
    new SaveHashes({path: path.join(__dirname, 'dist'), filename: 'manifest.json'})
  ]
};
