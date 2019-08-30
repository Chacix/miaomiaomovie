import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./stores";

import axios from "axios";

Vue.prototype.axios = axios; /* 【9】这个记得往Vue类上加上axios */

Vue.filter("setWH", (url, arg) => {
  //【17】为什么要在main.js里面设置filter
  return url.replace(/w\.h/, arg);
});

import Scroller from "@/components/Scroller";
Vue.component("Scroller", Scroller); /* 【25】Scroll全局配置 */

import Loading from "@/components/Loading";
Vue.component("Loading", Loading); //【28】最好将这两个组件分为全局组件，那个views是tabbar

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
