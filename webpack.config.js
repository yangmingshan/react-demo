const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'production';
const _DEV_ = NODE_ENV === 'development';

const config = {
  mode: NODE_ENV,
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader?minimize', 'postcss-loader' ]
      })
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [ 'babel-loader' ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
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
  optimization: {
    runtimeChunk: { name: 'manifest' },
    splitChunks: {
      chunks: 'all',
      filename: 'js/vendor.[chunkhash:8].js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.tpl' }),
    new ExtractTextPlugin(_DEV_ ? '[name].css' : 'css/[name].[contenthash:8].css')
  ]
};

if (_DEV_) {
  config.devtool = 'cheap-module-eval-source-map';
  config.devServer = {
    port: 8080,
    stats: 'errors-only',
    overlay: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://api.development.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  };
}

if (process.env.ENV === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
