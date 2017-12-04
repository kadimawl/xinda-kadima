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
          <a v-for="productType in productTypes" :key="productType.id" v-on:click="navigationC" href="javascript:void(0)">{{productType.name}}</a>
        </td>
      </tr>
    </table>
    <div class="navigation">
      <button>综合排序</button>
      <button>价格↑↑</button>
      <button>接单数↑↑</button>
    </div>
    <div class="shopTypes">
      <div v-for="shopType in shopTypes" :key="shopType.id">
        <div class="logo">
          <img src="" alt=""><img src="" alt="">
        </div>
        <div>
          <p>{{shopType.providerName}}</p>
          <p>信誉<span class="xinyu"></span></p>
          <p>{{shopType.regionName}}</p>
          <p>累计服务客户次数：{{shopType.orderNum}}<span>丨</span>好评率：100%</p>
          <a href="javascript:void(0)" v-for="product in shopType.productTypes" :key="product.id">{{product}}</a>
          <button>进入店铺</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var that = this;
    // function getShop(TypeCode) {
      
    // }
    this.getShop();

    this.ajax
      .post(
        "http://115.182.107.203:8088/xinda/xinda-api/product/style/list",
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
        console.log(productType);
        this.productTypes = productType;
      });
  },
  data() {
    return {
      productTypes: [],
      shopTypes: []
    };
  },
  methods:{
    navigationC : function(event){
      console.log(123123)
    },
    getShop:function(TypeCode){
      var that = this;
      this.ajax
        .post("http://115.182.107.203:8088/xinda/xinda-api/provider/grid", {
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
          // console.log(shops);
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
</style>