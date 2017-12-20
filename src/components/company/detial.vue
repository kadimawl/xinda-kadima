<template>
<div class="body">
  <p class="topP">首页/{{product.info}}</p>
  <div class="shopBuy">
    <img src="../../assets/shop/u1182.png" alt="">
    <div>
      <h3>{{product.info}}</h3>
      <p>{{product.name}}</p>
      <div>
        <h5>市场价：<del>￥{{product.marketPrice}}</del></h5>
        <h5>价&nbsp;&nbsp;格：<h4>￥{{product.status}}</h4>元</h5>
      </div>
      <p>类&nbsp;&nbsp;型：<a href="javascript:void(0)">{{product.info}}</a></p>
      <p>地&nbsp;&nbsp;区：{{shops.providerRegionText}}</p>
      <p>购买数量：<input @click="les()" type="button" value="-"><input :oninput="change()" @blur="blurInp()" class="math" type="text" v-model="num"><input @click="add()" type="button" value="+"></p>
      <button class="buyNow" @click="buyNow(id,num)">立即购买</button>
      <button @click="buyAdd(id,num)">加入购物车</button>
    </div>
    <div>
      <h3>顶级服务商</h3>
      <p>{{provider.name}}</p>
      <button>马上咨询</button>
      <div>
        <a href="javascript:void(0)">查看服务商</a>
      </div>
    </div>
  </div>
  <img class="ad" src="../../assets/shop/u1225.png" alt="">
  <div>
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      shops: [],
      product: [],
      provider: [],
      id: "",
      num: 1
    };
  },
  created() {
    var shoppingID = this.$route.query.shoppingId;
    var that = this;
    this.ajax
      .post(
        "/xinda-api/product/package/detail",
        this.qs.stringify({
          sId: shoppingID
        })
      )
      .then(function(data) {
        var shop = data.data.data;
        that.product = shop.product;
        that.provider = shop.provider;
        that.shops = shop;
        that.id = shoppingID;
      });
  },
  methods: {
    buyNow(id, num) {
      this.$router.push({
        path: "/order",
        query: { shoppingID: id, shopNum: num }
      });
    },
    buyAdd(id) {
      this.$router.push({
        path: "/tabs/shoppingCart",
        query: { shoppingID: id }
      });
    },
    les() {
      this.num -= 1;
      if (this.num == 0) {
        this.num = 1;
      }
    },
    add() {
      this.num -= -1;
    },
    change() {
      var nu = this.num;
      if (nu) {
        nu = parseInt(nu);
      } else {
        return;
      }
      if (nu < 1) {
        nu = 1;
      }
      this.num = nu;
    },
    blurInp() {
      if (!this.num) {
        this.num = 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body {
  width: 1200px;
  margin: 0 auto;
}
p {
  font-size: 13px;
  color: #696969;
}
.topP {
  margin: 25px 0 15px 0;
}
.shopBuy {
  display: flex;
  justify-content: space-between;
  img {
    width: 525px;
    height: 390px;
    background: pink;
  }
  h3 {
    font-size: 23px;
    margin-bottom: 20px;
  }
  h5 {
    font-size: 13px;
    color: #696969;
    font-weight: normal;
    margin: 3px 0;
    h4 {
      display: inline;
      color: #fe0000;
      font-size: 18px;
      margin: 0 10px;
    }
  }
  & > div:nth-child(2) {
    width: 390px;
    div {
      height: 66px;
      padding: 5px;
      background: #f7f7f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 20px 0;
    }
    a {
      display: inline-block;
      padding: 3px 5px;
      border: 1px solid #2693d4;
      color: #2693d4;
      text-decoration: none;
      margin-bottom: 25px;
    }
    input {
      width: 30px;
      height: 32px;
      background: #f7f8fa;
      border: 1px solid #cccccc;
      font-size: 15px;
      margin: 20px 0;
    }
    .math {
      background: #ffffff;
      width: 50px;
      line-height: 20px;
    }
    button {
      width: 95px;
      height: 27px;
      border: 1px solid #2693d4;
      border-radius: 3px;
      font-size: 14px;
      line-height: 27px;
      background: #ffffff;
      color: #2693d4;
      margin-left: 17px;
    }
    .buyNow {
      color: #ffffff;
      background: #2693d4;
      margin-left: 23px;
    }
  }
  & > div:nth-child(3) {
    width: 200px;
    height: 235px;
    border: 1px solid #2693d4;
    text-align: center;
    overflow: hidden;
    h3 {
      margin: 20px 0;
    }
    button {
      width: 90px;
      height: 30px;
      border: 1px solid #2693d4;
      border-radius: 3px;
      font-size: 14px;
      line-height: 30px;
      background: #ffffff;
      color: #2693d4;
      margin: 25px 0;
    }
    div {
      height: 30%;
      background: #bdddf2;
      padding: 20px;
      a {
        display: block;
        width: 110px;
        height: 30px;
        border-radius: 3px;
        font-size: 14px;
        line-height: 30px;
        background: #2693d4;
        color: #ffffff;
        margin: 0 auto;
        text-decoration: none;
      }
    }
  }
}
.ad {
  display: block;
  width: 100%;
  height: 100px;
  background: yellowgreen;
  margin: 20px 0 40px 0;
}
</style>