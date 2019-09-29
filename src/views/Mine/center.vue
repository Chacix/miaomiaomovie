<template>
  <div>
    个人中心: <a href="javascript:;" @touchstart="handleToLogout">退出</a>
  </div>
</template>

<script>
export default {
  name:'presoncenter',
  methods:{
    handleToLogout(){
      this.axios.get('/api2/users/logout').then((res)=>{
        var status = res.data.status;
        if(status === 1){
          this.$router.push('/mine/login')
        }
      })
    }
  }
}
</script>

<style>

</style>