const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const autoprefixer = require("autoprefixer");
const postcss = require('postcss');

module.exports = merge(common, {
  mode: "production",
  target: 'web',
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          "postcss-loader",
          'sass-loader',
        ],
      },
    ],
  },
});