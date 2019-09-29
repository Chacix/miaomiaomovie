<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotList"
                :key="item.id"
                @tap="handleToCity(item.nm, item.id)"
              >
                {{ item.nm }}
              </li>
              <!-- 【12】数据渲染到V的开始 -->
            </ul>
          </div>

          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index }}</h2>
              <!-- 这一块负责每个城市的开头字母AB -->
              <ul>
                <li
                  v-for="itemList in item.list"
                  :key="itemList.id"
                  @tap="handleToCity(itemList.nm, itemList.id)"
                >
                  {{ itemList.nm }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>

    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",

  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    };
  },

  mounted() {
    /* 【33】本地化处理 */
    var cityList = window.localStorage.getItem("cityList");
    var hotList = window.localStorage.getItem("hotList");

    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList);
      this.hotList = JSON.parse(hotList);
      this.isLoading = false; /* 【34】不要这个 */
    } else {
      /* 【8】为什么不用create二用mounted */
      this.axios.get("/api/cityList").then(res => {
        /* console.log(res);//这里要打开城市才会得到data from resquest */
        var msg = res.data.msg;
        this.isLoading = false;
        if (msg === "ok") {
          var data = res.data.data.cities;
          // [{index:"A",list:[{nm:"阿城",id:123}]}]
          var { cityList, hotList } = this.formatCityList(data);
          this.cityList = cityList;
          this.hotList = hotList;
          window.localStorage.setItem(
            "cityList",
            JSON.stringify(cityList)
          ); /* 【32】在这设置localstorage，而且要把json */
          window.localStorage.setItem("hotList", JSON.stringify(hotList));
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];

      /* ishot */
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      for (let i = 0; i < cities.length; i++) {
        const firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          // 新添加index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          // 累加到已有的index
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter)
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
          }
        }
      }

      cityList.sort((a, b) => {
        /* 【11】注意这里的index是chrome的V8引擎带的排序 */
        if (a.index > b.index) {
          return 1;
        } else if (a.index < b.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function toCom(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }

      return {
        cityList,
        hotList
      };
    },
    handleToIndex(index) {
      /* 【13.2】处理城市A使得屏幕位置不同 */
      var h2 = this.$refs.city_sort.getElementsByTagName(
        "h2"
      ); /* 【13】getElements不是getElement */
      //this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop); //【27】这个为什么是负数
    },
    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style lang="scss" scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
