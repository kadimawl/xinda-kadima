<template>
<div>
  <arrow/>
  <div class="top"><button v-bind:class="{'active':top==1}" @click="act(1)">默认排序</button><button v-bind:class="{'active':top==2}" @click="act(2)">价格</button></div>
  <div class="body" v-for="Product in products" :key="Product.id" @click="gotoShop(Product.id)">
    <div class="logo">
      <img :src="tUrl+Product.productImg" alt="">
    </div>
    <div class="listInf">
      <div>
        <h3>{{Product.serviceName}}</h3>
        <p>{{Product.serviceInfo}}</p>
      </div>
      <div class="span">
        <span>{{Product.regionName}}</span>
        <span><a href="javascript:void(0)">￥{{Product.price}}</a>{{Product.unit}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import arrow from "../arrow";
export default {
  components: {  arrow },
  data() {
    return {
      shopTypes: [],
      products: [],
      top: 1
    };
  },
  created() {
    //商品列表请求函数
    var that = this;
    this.ajax
      .post(
        "/xinda-api/product/package/grid",
        this.qs.stringify({
          start: 0,
          productTypeCode: this.$route.query.productTypeCode,
          sort: 2
        })
      )
      .then(function(data) {
        var gData = data.data.data;
        that.products = gData;
      });
  },
  methods: {
    gotoShop(id) {
      this.$router.push({
        path: "/m/shop/shopDetail",
        query: { sId: id }
      });
    },
    act(t) {
      this.top = t;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top {
  margin-top: .60rem;
  padding: 0.45rem;
  display: flex;
  justify-content: center;
  button {
    width: 1.8rem;
    height: 0.6rem;
    font-size: 0.25rem;
    border: 1px solid #2793d4;
    background: #ffffff;
    border-radius: 0 0.05rem 0.05rem 0;
  }
  button:nth-child(1) {
    border-radius: 0.05rem 0 0 0.05rem;
  }
  .active {
    background: #2793d4;
    color: #ffffff;
  }
}

.body {
  display: flex;
  justify-content: center;
  padding: 0.2rem 0;
  border-bottom: 1px solid #cfcfcf;
}
.logo {
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  border: 1px solid #e3e3e3;
  margin-right: 0.25rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.listInf {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: 0.27rem;
    font-weight: 500;
    margin-top: 0.1rem;
    font-weight: 100;
  }
  p {
    font-size: 0.23rem;
    line-height: 0.45rem;
    font-weight: 100;
  }
  .span {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 0.17rem;
    a {
      font-size: 0.26rem;
      font-weight: bold;
      color: red;
    }
  }
}
</style>
