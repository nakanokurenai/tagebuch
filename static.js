const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const proxy = require('http-proxy-middleware')

dotenv.load()

const webpackConfiguration = require('./webpack.config')({}, {})

const app = express()
const dist = path.join(__dirname, 'dist')

// import proxy configuration from webpack configuration
Object
  .entries(webpackConfiguration.devServer.proxy)
  .forEach(([key, value]) => {
    app.use(key, proxy(value))
  })

app.use('/', express.static(dist))
app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: dist
  })
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('listen on port ' + port)
