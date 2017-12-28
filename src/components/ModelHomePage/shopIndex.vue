<template>
  <div class="ShopIndex">
    <!-- <h3>这是店铺首页</h3> -->
    <p>首页/公司工商</p>
    <table cellspacing ="0">
      <tr>
        <td><h5>服务区域</h5></td>
        <td>
          <select name="" id="">
            <option value="xuanze">省</option>
            <option value="beijing">北京市</option>
          </select>
          <select name="" id="">
            <option value="xuanze">市</option>
            <option value="beijing">北京市</option>
          </select>
          <select name="" id="">
            <option value="xuanze">区</option>
            <option value="beijing">北京市</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><h5>产品类型</h5></td>
        <td class="productTypes">
          <a v-for="productType in productTypes" :key="productType.id" v-on:click="productTypesC" href="javascript:void(0)">{{productType.name}}</a>
        </td>
      </tr>
    </table>
    <div class="navigation">
      <a href="javascript:void(0)">综合排序</a>
      <a href="javascript:void(0)">价格↑↑</a>
      <a href="javascript:void(0)">接单数↑↑</a>
    </div>
    <div class="shopTypes">
      <div v-for="shopType in shopTypes" :key="shopType.id">
        <div class="logo">
          <img src="" alt=""><img src="" alt="">
        </div>
        <div class="shopText">
          <p>{{shopType.providerName}}</p>
          <p>信誉<span class="xinyu"></span></p>
          <p>{{shopType.regionName}}</p>
          <p>累计服务客户次数：{{shopType.orderNum}}<span>丨</span>好评率：100%</p>
          <a href="javascript:void(0)" v-for="product in shopType.productTypes" :key="product.id">{{product}}</a>
          <button v-bind:id="shopType.id" v-on:click="shopGoto($event)">进入店铺</button>
        </div>
      </div>
    </div>
    <div class="page">
      <button>上一页</button>
      <a href="javascript:viod(0)">1</a>
      <button>下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getShop(); //调用商品列表请求函数

    //商品类别导航
    this.ajax
      .post(
        "/xinda-api/product/style/list",
        {}
      )
      .then(data => {
        var products = data.data.data;
        var productType = [{ code: 0, name: "所有" }];
        for (var key in products) {
          var newpro = products[key].itemList;
          for (var a in newpro) {
            productType.push(newpro[a]);
          }
        }
        productType.sort(this.objSort("code"));
        this.productTypes = productType;
      });
  },
  data() {
    return {
      productTypes: [],
      shopTypes: [],
      shopID: ""
    };
  },
  methods: {
    productTypesC: function(event) {//商品分类单击事件
    },
    shopGoto: function(e) {//商品页面跳转事件//获取店铺ID
      var shopID=e.target.getAttribute('id');//获取店铺ID
      sessionStorage.setItem("shopID",shopID);
      location.href="#/shopList";
    },
    getShop: function(TypeCode) {//商品列表请求函数
      var that = this;
      this.ajax
        .post("/xinda-api/provider/grid", {
          start: 0,
          limit: 6,
          productTypeCode: 10,
          regionId: 110102,
          sort: 1,
          productTypeCode: TypeCode
        })
        .then(data => {
          var shops = data.data.data;
          for (var key in shops) {
            shops[key].productTypes = shops[key].productTypes.split(",");
            shops[key].productTypeCodes = shops[key].productTypeCodes.split(
              ","
            );
          }
          that.shopTypes = shops;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.ShopIndex {
  width: 1200px;
  margin: 0 auto;
  p {
    font-size: 13px;
    color: #2a2a2a;
    margin: 13px 0;
  }
}
table {
  background: #f7f7f7;
  width: 1200px;
  tr {
    height: 40px;
    h5 {
      font-size: 15px;
      margin: 0;
      line-height: 40px;
      color: #010101;
      text-align: center;
      font-weight: normal;
    }
    td {
      border: 1px solid #cccccc;
    }
    td:nth-child(2) {
      padding: 0 12px;
      select {
        width: 88px;
        height: 22px;
        background: #f7f7f7;
      }
      a {
        display: inline-block;
        width: 80px;
        height: 25px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        text-decoration: none;
        color: #3c3c3c;
      }
      a:nth-child(1) {
        background: #2393d3;
        color: #ffffff;
        margin-right: 15px;
      }
    }
  }
}
.navigation {
  background: #f7f7f7;
  border: 1px solid #cccccc;
  margin-top: 24px;
  a {
    text-decoration: none;
    display: inline-block;
    width: 105px;
    height: 43px;
    font-size: 14px;
    color: #000000;
    text-align: center;
    line-height: 43px;
  }
  a:nth-child(1) {
    color: #ffffff;
    background: #2693d4;
  }
}
.shopTypes {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #cccccc;
  border-top: none;
  & > div {
    width: 569px;
    height: 250px;
    border: 1px solid #e9e9e9;
    margin: 12px 14px;
    display: flex;
  }
}
.logo {
  width: 200px;
  height: 250px;
  background: pink;
}
.shopText {
  padding: 10px 0;
  width: 360px;
  position: relative;
  p {
    font-size: 13px;
    color: #686868;
  }
  span {
    margin: 0 25px 0 15px;
  }
  a {
    display: inline-block;
    width: 71px;
    height: 22px;
    font-size: 13px;
    color: #ffffff;
    background: #2693d4;
    border-radius: 3px;
    margin: 2px;
    text-align: center;
    line-height: 22px;
    text-decoration: none;
  }
  button {
    display: block;
    width: 102px;
    height: 33px;
    background: #ff5a1a;
    color: #ffffff;
    font-size: 14px;
    line-height: 33px;
    text-align: center;
    border: none;
    border-radius: 5px;
    margin-bottom: 0;
    position: absolute;
    bottom: 20px;
  }
}
.page {
  text-align: center;
  margin: 60px 0 150px;
  button {
    width: 66px;
    height: 34px;
    border: 1px solid #cccccc;
    color: #cccccc;
    font-size: 13px;
    background: #ffffff;
  }
  a {
    display: inline-block;
    width: 37px;
    height: 34px;
    border: 1px solid #2693d4;
    color: #2693d4;
    font-size: 13px;
    line-height: 34px;
    text-decoration: none;
  }
}
</style>