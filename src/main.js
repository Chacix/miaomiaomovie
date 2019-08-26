import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./stores";

import axios from "axios";

Vue.prototype.axios = axios;/* 【9】这个记得往Vue类上加上axios */
Vue.config.productionTip = false;

Vue.filter('setWH',(url,arg)=>{//【17】为什么要在main.js里面设置filter
  return url.replace(/w\.h/,arg);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
