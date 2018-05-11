const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          argv.mode !== 'production'
            ? 'vue-style-loader'
            : MiniCSSExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [...(
          argv.mode !== 'production'
            ? []
            : [{
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }]
        )]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'bundle.css'
    })
  ]
})
