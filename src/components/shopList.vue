<template>
<div class="shopList">
        <!-- <h3>这是店铺首页</h3> -->
        <div class="logo">
            <img src="" alt="">
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
                  <img src="../assets/shop/shopIMG.png" alt="">
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
      providerInfo: ""
    };
  },
  created() {
    var shopID = sessionStorage.getItem("shopID");
    console.log(shopID)
    var that = this;
    this.ajax
      .post("http://115.182.107.203:8088/xinda/xinda-api/provider/detail", this.qs.stringify({
        id: shopID
        //请求店铺信息
      }))
      .then(function(data) {
        console.log(data)
        var shop = data.data.data;
        console.log(shop);
        // for (var key in shops) {
        //   if (shops[key].id === shopID) {
        //     var shop = shops[key];
        //   }
        // }
        that.providerName = shop.providerName;
        that.regionName = shop.regionName;
        that.providerInfo = shop.providerInfo;
      });
    // this.ajax //请求店铺商品a7304eecbd7246b4b424874e0359eab0
    //   .post(
    //     "http://115.182.107.203:8088/xinda/xinda-api/product/package/grid",
    //     {
    //       start: 0,
    //       limit: 8,
    //       productTypeCode: "1",
    //       providerId: "a7304eecbd7246b4b424874e0359eab0",
    //       sort: 2
    //     }
    //   )
    //   .then(function(data) {
    //     console.log(data.data.data);
    //   });
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
    width: 80px;
    margin: 0 30px 0 60px;
    height: 80px;
    background: pink;
  }
}
.body {
  display: flex;
  justify-content: space-between;
  height: 580px;
  margin-bottom: 40px;
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


