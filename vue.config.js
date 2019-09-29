module.exports = {
  devServer: {
    proxy: {/*二级请求数据库  */
      "/api2":{
        target:'http://localhost:3000',
        changeOrigin:true
      },
      "/api": {
        target: "http://39.97.33.178",
        changeOrigin: true /* 【7】记住设置完之后跨域要重启npm run */
      }
    }
  }
};
