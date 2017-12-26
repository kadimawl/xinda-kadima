<template>
  <div class="shop">
    <div class="header">
      <div class="icon" @click="goBack"></div>
      <!-- <p>商品详情</p> -->
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
  z-index: 10;
  position: fixed;
  top:0;
  left: 0;
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    background: url(../../assets/HomePageimages/arrow_left.png);
    background-size: 100% 100%;
  }
  // p {
  //   font-size: 0.3rem;
  //   color: #fff;
  //   margin:0 auto;
  //   margin-left: 36%;
  //   line-height: 0.6rem;
  // }
}
</style>
