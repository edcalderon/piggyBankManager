const Dotenv = require('dotenv-webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/eth-wallet/'
    : '/',
  outputDir: 'docs',
  configureWebpack: {
    plugins: [new Dotenv()]
  }
}