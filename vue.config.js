module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
      ? '/eth-wallet/'
      : '/',
    outputDir: 'docs',
  };