const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveSourceWebpackPlugin = require('remove-source-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'production';
const _DEV_ = NODE_ENV === 'development';

const config = {
  mode: NODE_ENV,
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? '[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[contenthash:8].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl',
      inlineSource: 'manifest.[a-z0-9]{8}.js$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new RemoveSourceWebpackPlugin('manifest.[a-z0-9]{8}.js$')
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
} else {
  config.module.rules[0].use = [{
    loader: MiniCssExtractPlugin.loader
  }, {
    loader: 'css-loader',
    options: { minimize: true }
  }, {
    loader: 'postcss-loader'
  }];
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css'
  }));
  config.optimization = {
    runtimeChunk: { name: 'manifest' },
    splitChunks: {
      chunks: 'all',
      filename: 'js/vendor.[contenthash:8].js'
    }
  };
}

if (process.env.MODE === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
