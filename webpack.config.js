const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ReplacePlugin = require('replace-webpack-plugin');

const env = require('./config');

const config = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './main.js',
    './assets/scss/main.scss',
  ],

  context: resolve(__dirname, 'app'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
    historyApiFallback: {
      index: 'index.html'
    }
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false,
              },
            },
          ],
          publicPath: '../'
        }),
      },
      { test: /\.(png|jpg|gif|svg)$/, use: 'url-loader?limit=15000&name=images/[name].[ext]' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader?&name=fonts/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]' },
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|jsx)$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        }
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([
      { from: 'vendors', to: 'vendors' },
      { from: 'assets/images', to: 'images' }
    ]),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new webpack.HotModuleReplacementPlugin(),
    new ReplacePlugin({
      entry: 'index.html',
      output: '../build/index.html',
      data: {
        config: JSON.stringify(env),
        css: '<link type="text/css" rel="stylesheet" href="/styles/style.css">',
        js: '<script type="text/javascript" src="/bundle.js"></script>'
      }
    })
  ],
};

module.exports = config;
