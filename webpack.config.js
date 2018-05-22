const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

module.exports = (_, argv) => ({
  entry: Object.assign(
    {
      bundle: ['./src/index.js']
    },
    argv.mode === 'production'
      ? {
        polyfill: ['babel-polyfill'],
      }
      : {}
  ),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  devtool: argv.mode !== 'production' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          argv.mode === 'production'
            ? MiniCSSExtractPlugin.loader
            : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [...(
          argv.mode === 'production'
            ? [{
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }]
            : []
        )]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'bundle.css'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        SENTRY_DSN: process.env.SENTRY_DSN
      })
    }),
    // plugins that enabled on production mode
    // specify to use on develop or none mode
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
