const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'production';
const _DEV_ = NODE_ENV === 'development';

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'postcss-loader' ]
      })
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [ 'babel-loader' ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [ {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.tpl',
      chunks: ['manifest', 'vendor', 'main']
    }),
    new ExtractTextPlugin(_DEV_ ? '[name].css' : 'css/[name].[chunkhash:8].css'),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

if (!_DEV_) {
  config.devtool = 'source-map';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    comments: false,
    compress: {
      warnings: false
    }
  }), new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module, count) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, 'node_modules')
        ) === 0
      );
    }
  }), new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }));
} else {
  config.devtool = 'cheap-module-eval-source-map';
  config.devServer = {
    port: 8080,
    hot: true,
    stats: 'errors-only',
    overlay: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://api.development.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  };
}

if (process.env.ENV === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
