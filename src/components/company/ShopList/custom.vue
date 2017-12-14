<template>
  <div class="custom">
    <div class="navgation">
        <router-link :to="{ path: '/shopList'}" replace>服务产品</router-link>
        <router-link :to="{ path: '/shopList/custom'}" replace>客服</router-link>
        <router-link :to="{ path: '/shopList/product'}" replace>资质证书</router-link>
    </div>
    <div class="customBody">
        <h3>工作时间：{{shops.workTime}}</h3>
        <h3>客服QQ：{{shops.qq}}</h3>
        <h3>微信：{{shops.weixin}}</h3>
        <h3>邮箱：{{shops.email}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shops: []
    };
  },
  created() {
    var that = this;
    var shopList = JSON.parse(sessionStorage.getItem("GoToshop"));
    console.log(shopList)
    !(function(list) {
      that.shops = list;
    })(shopList);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.customBody {
  padding: 30px;
  h3 {
    margin: 0 0 10px 0;
  }
}
</style>