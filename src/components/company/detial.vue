<template>
  <div class="body">
    <p class="topP">首页/{{product.info}}</p>
    <div class="shopBuy">
      <img :src="picURL" :onerror="loadDefault" alt="">
      <div>
        <h3>{{product.info}}</h3>
        <p>{{product.name}}</p>
        <div>
          <h5>市场价：<del>￥{{product.marketPrice}}</del></h5>
          <h5>价&nbsp;&nbsp;格：<h4>￥{{product.status}}</h4>元</h5>
        </div>
        <p>类&nbsp;&nbsp;型：<a href="javascript:void(0)">{{product.info}}</a></p>
        <p>地&nbsp;&nbsp;区：{{shops.providerRegionText}}</p>
        <p>购买数量：<input @click="les()" type="button" value="-"><input :oninput="change()" @blur="blurInp()"
        class="math" type="text" v-model="num"><input @click="add()" type="button" value="+"></p>
        <button class="buyNow" @click="buyNow(id,num)">立即购买</button>
        <button @click="buyAdd(id,num)">加入购物车</button>
      </div>
      <div>
        <h3>顶级服务商</h3>
        <p>{{provider.name}}</p>
        <button>马上咨询</button>
        <div>
          <a href="#/shopIndex">查看服务商</a>
        </div>
      </div>
    </div>
    <img class="ad" src="../../assets/shop/u1225.jpg" alt="">
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import plugins from "../../plugins";
import {MessageBox} from 'element-ui'
export default {
  data() {
    return {
      shops: [],
      product: [],
      provider: [],
      id: "",
      num: 1,
      picURL: ""
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
        that.picURL =that.tUrl + shop.product.img;
      });
  },
  computed: {
    ...mapGetters(["getName"])
  },
  methods: {
    ...mapActions(["setNum"]),
    loadDefault(){
      this.picURL=require('../../assets/shop/u1182.jpg');
    },
    //确认是否登录
    isLogged(id) {
      var that = this;
      if (!this.getName) {
        MessageBox.confirm("请先进行登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              path: "/outter/login",
              query: {
                redirect: "/detial/service",
                id: this.$route.query.shoppingId
              }
            });
          })
          .catch(() => {});
      } else {
        plugins(id, that, "/tabs/shoppingCart"); //加入购物车/立即购买公共方法
      }
    },
    buyNow(id, num) {
      //立即购买
      var that = this;
      this.isLogged(id);
      this.ajax.post("/xinda-api/cart/cart-num").then(data => {
        var cartNum = data.data.data.cartNum;
        that.setNum(cartNum);
      });
    },
    buyAdd(id, num) {
      //加入购物车
      var that = this;
      if (!this.getName) {
        
        MessageBox.confirm("请先进行登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              //登录之后在跳转回当前页
              path: "/outter/login",
              query: {
                redirect: "/detial/service",
                id: this.$route.query.shoppingId
              }
            });
          })
          .catch(() => {});
      } else {
        this.ajax
          .post("/xinda-api/cart/add", this.qs.stringify({ id: id, num: num }))
          .then(function() {
            that.ajax.post("/xinda-api/cart/cart-num").then(data => {
              var cartNum = data.data.data.cartNum;
              that.setNum(cartNum);
            });
          });
      }
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
      text-indent: -2px;
      text-align: center;
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