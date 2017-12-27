<template>
  <div class="service">
      <div class="serviceTop">
          <router-link :to="{ path: '/'}" replace>服务内容</router-link>
          <router-link :to="{ path: '/detial/evaluate'}" replace>商品评价</router-link>
          <span></span>
      </div>
      <div class="serviceBody" v-html="servers">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servers: []
    };
  },
  created() {
    var that = this;
    var shoppingID = this.$route.query.shoppingId;
    if (shoppingID) {
      this.ajax
        .post(
          "/xinda-api/product/package/detail",
          this.qs.stringify({
            sId: shoppingID
          })
        )
        .then(function(data) {
          var shop = data.data.data;
          sessionStorage.setItem("shoppingID", JSON.stringify(shop));
          shops(shop);
        });
      var shops = function(shop) {
        that.servers = shop.serviceList[0].serviceContent;
      };
    } else {
      var shopSer = JSON.parse(sessionStorage.getItem("shoppingID"));
      !(function(shops) {
        that.servers = shops.serviceList[0].serviceContent;
      })(shopSer);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.serviceTop {
  border: 1px solid #cccccc;
  height: 43px;
  background: #f7f7f7;
  position: relative;
  a {
    display: inline-block;
    text-align: center;
    line-height: 43px;
    width: 135px;
    font-size: 14px;
    text-decoration: none;
    color: #3c3c3c;
  }
  a:nth-child(1) {
    background: #2693d4;
    border: 1px solid #2693d4;
    position: relative;
    top: -1px;
    left: -1px;
    color: #ffffff;
  }
  span {
    display: block;
    position: absolute;
    top: 44px;
    left: 55px;
    border-top: 7px solid #2693d4;
    border-left: 7px solid #ffffff;
    border-right: 7px solid #ffffff;
    border-bottom: 7px solid #ffffff;
  }
}
.serviceBody {
  padding: 45px 30px;
  margin-bottom: 70px;
  border: 1px solid #cccccc;
  border-top: none;
}
</style>