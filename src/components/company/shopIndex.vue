<template>
  <div class="ShopIndex">
    <!-- <h3>这是店铺首页</h3> -->
    <p>首页/公司工商</p>
    <table cellspacing ="0">
      <tr>
        <td><h5>服务区域</h5></td>
        <td>
          <distpicker @selected="selected"></distpicker>
        </td>
      </tr>
      <tr>
        <td><h5>产品类型</h5></td>
        <td class="productTypes">
          <a v-for="(productType,index) in productTypes" :key="productType.id" v-on:click="productTypesC(index)"
          href="javascript:void(0)" v-bind:class="{butblue:index==butblue}">{{productType.name}}</a>
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
          <img :src="'http://115.182.107.203:8088/xinda/pic'+shopType.providerImg" alt="" class="logoImg">
          <img class="logoGold" src="../../assets/shop/GoldShop.png" alt="">
        </div>
        <div class="shopText">
          <p>{{shopType.providerName}}</p>
          <p>信誉<span class="xinyu">★★★★☆</span></p>
          <p>{{shopType.regionName}}</p>
          <p>累计服务客户次数：{{shopType.orderNum}}<span>丨</span>好评率：100%</p>
          <a href="javascript:void(0)" v-for="product in shopType.productTypes"
           :key="product.id">{{product}}</a>
          <button v-bind:id="shopType.id" v-on:click="shopGoto(shopType.id)">进入店铺</button>
        </div>
      </div>
    </div>
    <div class="page">
      <button>上一页</button>
      <a href="javascript:void(0)">1</a>
      <button>下一页</button>
    </div>
  </div>
</template>

<script>
import distpicker from "../distpicker";
export default {
  components: { distpicker },
  created() {
    this.getShop(); //调用商品列表请求函数

    //商品类别导航
    this.ajax.post("/xinda-api/product/style/list").then(data => {
      var products = data.data.data;
      var productType = [{ code: 0, name: "所有", class: "butblue" }];
      for (var key in products) {
        var newpro = products[key].itemList;
        for (var a in newpro) {
          productType.push(newpro[a]);
        }
      }
      productType.sort(this.objSort("code"));
      this.productTypes = productType;
    });
    this.productTypesC(0);
  },
  data() {
    return {
      productTypes: [],
      shopTypes: [],
      shopID: "",
      butblue: "-1",
      seleCode: ""
    };
  },
  methods: {
    productTypesC: function(index) {
      //商品分类单击事件
      this.butblue = index;
    },
    shopGoto: function(id) {
      //商品页面跳转事件
      this.$router.push({ path: "/shopList", query: { shopID: id } });
    },
    getShop: function() {
      //商品列表请求函数
      var that = this;
      this.ajax
        .post("/xinda-api/provider/grid", {
          start: 0,
          limit: 6,
          productTypeCode: 10,
          regionId: 110102,
          sort: 1
          // productTypeCode: TypeCode
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
    },
    selected: function(code) {
      this.seleCode = code;
      console.log(this.seleCode);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
        margin-right: 5px;
      }
      a:nth-child(1) {
        margin-right: 10px;
      }
      .butblue {
        background: #2393d3;
        color: #ffffff;
      }
      a:hover {
        background: #2393d3;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .logoImg {
    width: 80%;
  }
  .logoGold {
    position: absolute;
    bottom: 20px;
    left: 40px;
  }
}
.shopText {
  padding: 10px 0;
  width: 360px;
  position: relative;
  p {
    font-size: 13px;
    color: #686868;
    span {
      color: red;
    }
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