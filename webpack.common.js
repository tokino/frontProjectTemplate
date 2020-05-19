const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'app': ['./src/ts/index.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].dist.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.pug', '.styl']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/index.pug',
      chunks: ['app']
    }),
    new MiniCSSExtractPlugin({
      publicPath: '/',
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  }
};