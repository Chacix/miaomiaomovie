<template>
  <div id="main">
    <Header title="喵喵电影" />
    <!-- 传递title属性 -->
    <div id="content">
      <div class="movie_menu">
        <!-- 这里加二级路由 -->
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{ $store.state.city.nm }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>

        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
        </div>

        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>

      <!-- 这里做二级路由 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar />
    <!-- <MessageBox /> 【39】多加这个没用，最好用js生成-->
    <router-view name="detail" /><!--【47】匹配了上面那个二级路由就不会匹配第二个路由  -->
  </div>
</template>

<script>
import Header from "@/components/Header"; //记得这里是@/而不是@
import TabBar from "@/components/TabBar";

import { messageBox } from "@/components/js/index.js";

export default {
  name: "Movie",
  data(){
    return{
      movieList:[],
    }
  },
  components: {
    Header,
    TabBar
    /*    messageBox ,
     */
  },
  
  mounted() {
    setTimeout(() => {

      this.axios.get("/mock/index.json").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {
           this.movieList = res.data.data.movieList;
           console.log("mock接口"+this.movieList)
        }
      })
      this.axios.get("/api/getLocation").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {

          var nm = res.data.data.nm;
          var id = res.data.data.id;
         
          if(this.$store.state.city.id == id){/* 【41】为什么这里用==不用=== */
            return;/* 【42】代码先pull再push */
          }


          messageBox({
            title: "定位",
            content: nm,/* 【40】这个地理位置能定位海口想想怎么搞 */
            ok: "切换定位",
            cancel: "取消",
 
            handleOk() {
              window.localStorage.setItem('nowNm',nm);
              window.localStorage.setItem('nowId',id);
              window.location.reload();
            }
          });
        }
      });
    }, 2000);
  }
};
</script>

<style lang="scss" coped>
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  .movie_menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 10;
    .city_name {
      margin-left: 20px;
      height: 100%;
      line-height: 45px;
    }
    .city_name.active {
      /* 5、记1住buneng写.city_name .active 而是.city_name.active */
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .city_name.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }

    .hot_swtich {
      display: flex;
      height: 100%;
      line-height: 45px;
    }
    .hot_item {
      font-size: 15px;
      color: #666;
      width: 80px;
      text-align: center;
      margin: 0 12px;
      font-weight: 700;
    }
    .hot_item.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .hot_item.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .search_entry {
      margin-right: 20px;
      height: 100%;
      line-height: 45px;
      i {
        font-size: 24px;
        color: red;
      }
    }

    .search_entry.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .search_entry.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
  }
}
</style>
