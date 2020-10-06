const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const $ = require('jquery');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['./src/index.js', './src/sass/style.scss'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'script.js',
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitError: true,
            emitWarning: true,
            failOnError: false,
          },
        }, {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        }, {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
          ],
        }, {
          test: /\.html$/,
          loader: 'html-loader',
        }, {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new CopyPlugin([
        { from: './src/img', to: './img' },
        { from: './src/audio', to: './audio' },
      ]),
      new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.min.js',
        jQuery: 'jquery/dist/jquery.min.js',
        'window.jQuery': 'jquery/dist/jquery.min.js',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
  };
  return config;
};
