<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" /><!-- 【31】loading位置 -->
    <Scroller
      v-else
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
    >
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <!-- 【16】想想什么时候用item.id,什么时候用item.index,如果接口中有id就用item.id -->
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img | setWH('128.180')" />
            <!-- 【18】第一个参数是item.img，第二个参数是128.180记住是字符串 -->
            <!-- 【14】【思考这个为什么路径不对却能导入】 -->
          </div>
          <div class="info_list">
            <h2 @tap="handleToDetail(item.id)">
              {{ item.nm }}
              <img v-if="item.version" src="@/assets/maxs.png" />
            </h2>
            <p>
              观众评价
              <span class="grade">{{ item.sc }}</span>
            </p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
//import BScroll from 'better-scroll';/* 【23】满足div在外的长宽小，div嵌套里面的长宽大 */

export default {
  name: "nowplaying",
  data() {
    return {
      movieList: [] /* 【15、为什么这里尽量用数组】 */,
      pullDownMsg: "",
      isLoading: true,
      prevCityId:-1
    };
  },
  activated() {/*  【36】为什么这里是把mounted换成 activated*/ 
    var cityId=this.$store.state.city.id;

    if(this.prevCityId === cityId){
      return;
    }

 
    console.log('【37】当换城市的时候会请求');

    this.axios.get("/api/movieOnInfoList?cityId="+cityId).then(res => {
        this.isLoading = false//【16】记得这里api之前要加
      var msg = res.data.msg;

      if (msg === "ok") {
        this.movieList = res.data.data.movieList;
        this.isLoading = false; //【29】请求成功就不渲染loading
        this.prevCityId = cityId
        // this.$nextTick(()=>{/* 【22】这个方法保证我们数据在赋完值之后，我们的界面渲染完毕之后再去拿这个方法回调 */
        //   var scroll = new BScroll(this.$refs.movie_body,{
        //     tap:true,
        //     probeType:1 //上拉到极限会刷新
        //   });/* 【24】bscroll要两个参数，其中第一格就是dom中的元素 */
        //   scroll.on('scroll',(pos)=>{
        //     if(pos.y > 30){
        //       this.pullDownMsg = '正在更新中';
        //     }

        //   })
        //   scroll.on('touchEnd',(pos)=>{
        //     if(pos.y > 30){
        //       this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
        //         var msg = res.data.msg;
        //         if(msg === 'ok'){
        //           this.pullDownMsg = '更新成功'
        //           setTimeout(() => {
        //             this.movieList = res.data.data.movieList;
        //             this.pullDownMsg = '';
        //           }, 1000);
        //         }
        //       })
        //       this.pullDownMsg = '更新成功';
        //     }

        //   })
        // });
      }
    });
  },
  methods: {
    handleToDetail(movieId) {
      this.$router.push('/movie/detail/1/'+movieId)/* 【46】路由跳转，与history */
       this.isLoading = false;/* 【45】为什么要加这里，处理知乎要加 */
    },
    handleToScroll(pos) {
    
      if (pos.y > 30 ) {
        this.pullDownMsg = "正在更新中s";
         this.isLoading = false;
      } 
    },
    handleToTouchEnd(pos) {
            /* 【30】记得第二次请求要放在这里true  */
      if (pos.y > 30) {
        this.isLoading = true;
        this.axios.get("/api/movieOnInfoList?cityId=11").then(res => {
   
          var msg = res.data.msg;
          if (msg === "ok") {
            this.isLoading = false;
            this.pullDownMsg = "更新成功"

            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#content {
  .movie_body {
    flex: 1;
    overflow: auto;
    .pullDown {
      margin: 0;
      padding: 0;
      border: 0;
    }
    ul {
      margin: 0 12px;
      overflow: hidden;
      li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
      }
    }
    .pic_show {
      width: 64px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    .info_list {
      margin-left: 10px;
      flex: 1;
      position: relative;
      h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
      }
      img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
    .btn_mall,
    .btn_pre {
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      background-color: #f03d37;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
    .btn_pre {
      background-color: #3c9fe6;
    }
  }
}
</style>
