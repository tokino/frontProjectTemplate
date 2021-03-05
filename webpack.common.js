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
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '/'
            },

          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  }
};