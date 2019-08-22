<template>
  <header id="header">
    <h1 class="headerbar">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    /* 从每个view里拿属性【到这】然后进行动态绑定 */
    title: {
      type: String,
      default: "喵喵电影"
    }
  }
};
</script>

<style lang="scss" scoped>
/*  注意这里要lang="scss" 和 scoped */
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  position: relative;

  h1 {
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    font-weight: normal;
  }
  i {
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -13px;
    font-size: 26px;
  }
}
</style>
