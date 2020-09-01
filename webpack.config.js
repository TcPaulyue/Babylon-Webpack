const HTMLWebpackPlugin = require('html-webpack-plugin')

const { resolve } = require('path')

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-typescript',
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      },
      {
        test: /\.babylon$/,
        use: [
          {
            loader: 'babylon-file-loader',
            options: {},
          },
        ],
      },
    ],
  },

  devtool: 'eval-cheap-source-map',

  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.png',
    }),
  ],

  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  devServer: {
    contentBase: resolve('public'),
    port: 5000,
    hot: true,
    open: true,
    historyApiFallback: true,
    /* https://webpack.js.org/configuration/stats/ */
    stats: {
      chunks: false,
      modules: false,
      hash: false,
      timings: false,
      assets: false,
      children: false,
      builtAt: false,
      entrypoints: false,
      version: false,
    },
  },
}
