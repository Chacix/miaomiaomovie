export default {
  path: "/movie",
  component: () => import("@/views/Movie"),
  children: [
    {
      path: "city",
      component: () => import("@/components/City")
    },
    {
      path: "search",
      component: () => import("@/components/Search")
    },
    {
      path: "comingsoon",
      component: () => import("@/components/ComingSoon")
    },
    {
      path: "nowplaying",
      component: () => import("@/components/NowPlaying")
    },
    {/*  二级路由的默认显示*/
      path:"/movie",
      redirect:"/movie/nowplaying"
    }
  ] 
};
