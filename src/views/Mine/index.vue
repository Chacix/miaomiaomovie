<template>
  <div id="main">
    <Header title="我的喵喵" />
    <div id="content">
      <router-view>
        
      </router-view>
    </div>

    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header"; //记得这里是@/而不是@
import TabBar from "@/components/TabBar";
import Login from "@/components/Login";

export default {
  name: "Mine",
  components: {
    Header,
    TabBar,
    Login
  }
};
</script>

<style></style>
