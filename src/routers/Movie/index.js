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
      path: "comingSoon",
      component: () => import("@/components/ComingSoon")
    },
    {
      path: "nowplaying",
      component: () => import("@/components/NowPlaying")
    },
    {
      path: "detail/1/:movieId",/* 【44】动态二级路由 */
      components: {
        default: () => import("@/components/NowPlaying"),
        detail: () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: "detail/2/:movieId",/* 【44】动态二级路由 */
      components: {
        default: () => import("@/components/ComingSoon"),
        detail: () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      /*  二级路由的默认显示*/
      path: "/movie",
      redirect: "/movie/nowplaying"
    }
  ]
};
