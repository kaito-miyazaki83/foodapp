const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://webservice.recruit.co.jp',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/rakuten-api': {
        target: 'https://app.rakuten.co.jp',
        changeOrigin: true,
        pathRewrite: { '^/rakuten-api': '' },
      },
    },
  },
})

