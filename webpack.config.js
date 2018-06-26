const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

module.exports = (_, argv) => ({
  entry: {
    bundle: ['./src/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
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
          MiniCSSExtractPlugin.loader,
          argv.mode === 'production' ? 'css-loader?minimize' : 'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/
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
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      "/__/firebase": {
        target: `https://${process.env.PROJECT_ID}.firebaseapp.com`,
        changeOrigin: true
      },
      "/api": {
        target: `https://${process.env.PROJECT_ID}.firebaseapp.com`,
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: new RegExp('/node_modules/@firebase'),
          name: "firebase",
          chunks: "initial",
          priority: 10
        }
      }
    }
  }
})
