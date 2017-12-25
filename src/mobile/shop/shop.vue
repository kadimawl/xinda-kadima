<template>
  <div class="shop">
    <div class="header">
      <div class="icon" @click="goBack"></div>
      <p>商品详情</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import mobileBottom from "../mobileBottom";
export default {
  components: { mobileBottom },
  methods:{
    goBack(){
      history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 0.6rem;
  background-color: #2a99da;
  display: flex;
  position: relative;
  .icon {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/HomePageimages/arrow_left.png);
    background-size: 100% 100%;
  }
  p {
    font-size: 0.3rem;
    color: #fff;
    margin:0 auto;
    line-height: 0.6rem;
  }
}
</style>
