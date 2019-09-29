<template>
  <div>
    <div>个人中心:</div>
    <div>
      当前用户:{{$store.state.user.name}}
      </br>
      <a href="javascript:;" @touchstart="handleToLogout">退出</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "presoncenter",
  data(){
    return {
   
    }
  },

  methods: {
    handleToLogout() {
      this.axios.get("/api2/users/logout").then(res => {
        var status = res.data.status;

        if (status === 1) {
          this.$store.commit('user/USER_NAME',{name:''})
          this.$router.push("/mine/login");
        }
      });
    }
  },

  beforeRouteEnter(to, from, next) {
    var that = this
    axios.get("/api2/users/getUser").then(res => {
      var status = res.data.status;


      if (status === 1) {
        next(vm =>{
          vm.$store.commit('user/USER_NAME',{name:res.data.data.username})
        });
   
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>

<style>
</style>