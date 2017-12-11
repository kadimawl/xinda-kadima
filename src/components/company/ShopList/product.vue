<template>
  <div class="product">
    <div class="navgation">
        <router-link :to="{ path: '/shopList'}" replace>服务产品</router-link>
        <router-link :to="{ path: '/shopList/custom'}" replace>客服</router-link>
        <router-link :to="{ path: '/shopList/product'}" replace>资质证书</router-link>
    </div>
    <div class="productBody">
        <img :src="'http://115.182.107.203:8088/xinda/pic'+img1" alt="">
        <img :src="'http://115.182.107.203:8088/xinda/pic'+img2" alt="">
        <img :src="'http://115.182.107.203:8088/xinda/pic'+img3" alt="">
        <img :src="'http://115.182.107.203:8088/xinda/pic'+img4" alt="">
        <img :src="'http://115.182.107.203:8088/xinda/pic'+img5" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: ""
    };
  },
  created() {
    var that = this;
    var shopList = JSON.parse(sessionStorage.getItem("GoToshop"));
    !(function(list) {
      console.log(list);
      that.img1 = list.businessCertPath;
      that.img2 = list.hrCertPath;
      that.img3 = list.orgCertPath;
      that.img4 = list.providerImg;
      that.img5 = list.taxCertPath;
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
  a:nth-child(3) {
    border-bottom: 2px solid #2693d4;
    color: #2693d4;
  }
}
.productBody {
  padding: 30px;
}
</style>