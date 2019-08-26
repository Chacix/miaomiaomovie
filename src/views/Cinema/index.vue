<template>
  <div id="main">
    <Header title="喵喵影院" />

    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>

      <CityList />
      <!-- 【5】记住HTML标签的层级，这样就好做 -->
    </div>

    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header"; //【10】记得这里是@/而不是@
import TabBar from "@/components/TabBar";
import CityList from "@/components/CityList";

export default {
  name: "Cinema",
  components: {
    Header,
    TabBar,
    CityList
  }
};
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
</style>
