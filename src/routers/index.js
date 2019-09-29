import Vue from "vue";
import Router from "vue-router";

import moviePage from "./Movie";
import cinemaPage from "./Cinema";
import minePage from "./Mine";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    moviePage,
    minePage,
    cinemaPage,

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
    {
      /* 这个一定要放最后 ，不然会出现stack size 重定向错误路由到movie */
      path: "/*",
      redirect: "/movie"
    }
  ]
});
