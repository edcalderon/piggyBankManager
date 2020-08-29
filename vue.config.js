const Dotenv = require('dotenv-webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: 'dist',
  configureWebpack: {
    plugins: [new Dotenv()]
  }
}