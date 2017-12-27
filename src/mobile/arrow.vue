<template>
    <div class="header">
        <div class="icon" @click="goBack"></div>
        <img src="../assets/index/icon.png" alt="">
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
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
  margin-bottom: .05rem;
  position: fixed;
  top: 0;
  left: 0;
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    background: url(../assets/HomePageimages/arrow_left.png);
    background-size: 100% 100%;
  }
  img{
    width: .35rem;
    height: .35rem;
    display: block;
    margin: auto;
  }
}
</style>
