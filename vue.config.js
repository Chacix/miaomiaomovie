module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.97.33.178",
        changeOrigin: true /* 【7】记住设置完之后跨域要重启npm run */
      }
    }
  }
};
