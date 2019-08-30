<template>
  <div class="messageBox">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div class="bottom">
      <div @touchstart="handleCancel">{{cancel}}</div>
      <div @touchstart="handleOk">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"MessageBox"/* 命名要规范 */
}
</script>

<style lang="scss" scoped>
  .messageBox{
    position: absolute;
    left:50%;
    top:50%;
    margin:-60px 0 0 -100px;

    width:200px;
    height:140px;
    border:1px #cccccc solid;
    border-radius:4px;
    background: white;
    box-shadow: 3px 3px 3px 3px #cccccc;
    

    h2{
      text-align:center;
      line-height: 40px;
      font-size: 18px;
    }

    p{
      text-align:center;
      line-height: 20px;

    }
    
    .bottom {
      display: flex;
      position: absolute;
      bottom:0;
      width:100%;
      border-top:2px #ccc solid;

      div{
        flex:1;
        text-align:center;
        line-height: 30px;
        border:1px #ccc solid;

        :last-child{
          border:none;
        }
      }

    }

     
  }
</style>