const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    // analytics: './js/analytics.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot|)$/i,
        loader: 'file-loader',
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};