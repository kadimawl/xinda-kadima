<template>
<div class="shopList">
    <!-- <h3>这是店铺首页</h3> -->
    <div class="logo">
      <img :src="tUrl+LogoUrl" alt="">
      <div>
        <h1>{{providerName}}</h1>
        <p>{{regionName}}</p>
      </div>    
    </div>
    <div class="body">
      <div class="shopName">
        <div>
            <h3>公司介绍</h3>
            <p>{{providerInfo}}</p>
        </div>
        <div class="serverLogo">
          <img src="../../assets/shop/shopIMG.png" alt="">
        </div>
      </div>

      <div class="commodityList">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      providerName: "",
      regionName: "",
      providerInfo: "",
      LogoUrl: ""
    };
  },
  created() {
    var that = this;
    if (this.$route.query.shopID) {
      var shopID = this.$route.query.shopID;
      this.ajax
        .post(
          "/xinda-api/provider/detail",
          this.qs.stringify({
            id: shopID
            //请求店铺信息
          })
        )
        .then(function(data) {
          var shop = data.data.data;
          that.providerName = shop.name;
          that.regionName = shop.regionName;
          that.providerInfo = shop.providerInfo;
          that.LogoUrl = shop.providerImg;
          var shopStory = JSON.stringify(shop);
          sessionStorage.setItem("GoToshop", shopStory);
        });
    } else {
      var shop = JSON.parse(sessionStorage.getItem("GoToshop"));
      that.providerName = shop.name;
      that.regionName = shop.regionName;
      that.providerInfo = shop.providerInfo;
      that.LogoUrl = shop.providerImg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shopList {
  width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}
.logo {
  display: flex;
  align-items: center;
  border: 1px solid #e9e9e9;
  height: 180px;
  margin-bottom: 30px;
  img {
    margin: 0 30px 0 60px;
    height: 60px;
  }
}
.body {
  display: flex;
  justify-content: space-between;
  height: 580px;
  margin-bottom: 140px;
  .shopName {
    width: 300px;
    border: 1px solid #e9e9e9;
    position: relative;
    h3 {
      font-size: 23px;
      font-weight: normal;
      margin: 15px 10px;
    }
    p {
      padding: 25px;
      color: #242424;
      font-size: 14px;
      text-indent: 2rem;
    }
    .serverLogo {
      width: 100%;
      height: 250px;
      border-top: 1px solid #e9e9e9;
      position: absolute;
      bottom: 0;
    }
  }
  .commodityList {
    width: 870px;
    border: 1px solid #e9e9e9;
  }
}
</style>


