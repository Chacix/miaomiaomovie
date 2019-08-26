<template>
  <div class="movie_body">
    <ul>

      <li v-for="item in movieList" :key="item.id">
        <!-- 【16】想想什么时候用item.id,什么时候用item.index,如果接口中有id就用item.id -->
        <div class="pic_show">
          <img :src="item.img | setWH('128.180')" /> <!-- 【18】第一个参数是item.img，第二个参数是128.180记住是字符串 -->
          <!-- 【14】【思考这个为什么路径不对却能导入】 -->
        </div>
        <div class="info_list">
          <h2>{{item.nm}}
            <img v-if="item.version" src="@/assets/maxs.png"></img>
          </h2>
          <p>
            观众评价
            <span class="grade">{{item.sc}}</span>
          </p>
          <p>主演: {{item.star}}</p>
          <p>{{item.showInfo}}</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "nowplaying",
  data() {
    return {
      movieList: [] /* 【15、为什么这里尽量用数组】 */
    };
  },
  mounted() {
    this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {//【16】记得这里api之前要加/
      console.log('2')
      var msg = res.data.msg;
      console.log(msg);
      if (msg === "ok") {

        this.movieList = res.data.data.movieList;
      } 
    });
  }
};
</script>

<style lang="scss" scoped>
#content {
  .movie_body {
    flex: 1;
    overflow: auto;
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
