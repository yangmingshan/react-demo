const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const WebpackStylish = require('webpack-stylish');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // prettier-ignore

const NODE_ENV = process.env.NODE_ENV || 'production';
const _DEV_ = NODE_ENV === 'development';

const config = {
  mode: NODE_ENV,
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? '[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[contenthash:8].js'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: _DEV_ ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs'
    })
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
  config.stats = 'none';
  config.plugins.push(
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: [/runtime\.[a-z0-9]{8}\.js$/],
      preload: {
        chunks: 'initial',
        test: [/vendors\.[a-z0-9]{8}\.js$/, /main\.[a-z0-9]{8}\.js$/]
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new WebpackStylish()
  );
  config.optimization = {
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](?!.*normalize\.css)/
        }
      }
    }
  };
}

if (process.env.MODE === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
