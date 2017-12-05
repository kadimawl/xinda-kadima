<template>
  <div class="custom">
    <div class="navgation">
        <a href="/#/shopList">服务产品</a>
        <a href="/#/shopList/custom">客服</a>
        <a href="/#/shopList/product">资质证书</a>
    </div>
    <div>
        2222222222222
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.commodityList {
  width: 870px;
  border: 1px solid #e9e9e9;
  .navgation {
    height: 40px;
    border-bottom: 2px solid #e9e9e9;
    a {
      display: inline-block;
      width: 110px;
      height: 40px;
      text-decoration: none;
      line-height: 50px;
      text-align: center;
      color: #3f3f3f;
      margin: 0 10px;
    }
    a:nth-child(2) {
      border-bottom: 2px solid #2693d4;
      color: #2693d4;
    }
  }
}
</style>