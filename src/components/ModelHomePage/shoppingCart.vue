<template>
  <div>
    <div class="Cart">
      <div class="Cart-content">
        <div class="Cart-top">
          <p>首页/</p>
          <p>购物车</p>
        </div>
        <div class="Cart-head">
          <div>
            <p>全部商品</p>
            <p>({{cartLists.length}})</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>公司</th>
              <th>服务商品</th>
              <th>单价</th>
              <th>数量</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody class="store" v-for="(Goods,idx) in cartLists" :key="Goods[idx]">
            <tr>
              <p class="storeName">店铺：{{Goods.providerName}}</p>
            </tr>
            <tr class="itemLists">
              <td class="itemPic"><img :src="'http://115.182.107.203:8088/xinda/pic'+Goods.providerImg" alt=""></td>
              <td class="serviceName">{{Goods.serviceName}}</td>
              <td>￥{{Goods.unitPrice}}</td>
              <td>
                <button @click="minus(Goods.serviceId,Goods.buyNum)">-</button>
                <input type="text" v-model="Goods.buyNum">
                <button @click="add(Goods.serviceId)">+</button>
              </td>
              <td class="sumPrice">￥{{Goods.totalPrice}}</td>
              <td class="delete">
                <div @click="dele(Goods.serviceId)">删除</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="tomoney">
          <div class="total">金额总计：
            <p class="totalPay">￥{{tlPay}}</p>
          </div>
          <button class="continue" @click="toHomePage">继续购物</button>
          <button class="balance" @click="suBmit">去结算</button>
        </div>
        <div class="hotservice">
          <p>热门服务</p>
          <div class="service">
            <div class="serviceBox" v-for="product in products" :key="product.id">
              <b>{{product.serviceName}}</b>
              <div class="imgs"></div>
              <p>{{product.serviceInfo}}</p>
              <p>销量：{{product.buyNum}}</p>
              <h2>￥{{product.price}}</h2>
              <del>原价：￥1200</del>
              <span>
                <a href="javascript:void(0);" @click="todetail(product.id)">查看详情>></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    var that = this;
    this.recData(); //拉取购物品项列表
    this.recomData(); //拉取推荐服务列表
    this.ajax.post("xinda-api/cart/cart-num").then(data => {
      that.cartNum = data.data.data.cartNum;
      that.setNum(that.cartNum);
      sessionStorage.setItem(that.cartNum, that.cartNum);
    });
  },
  data() {
    return {
      products: [],
      cartLists: [],
      num: "",
      tlPay: 0,
      orderNo: "",
      cartNum: ""
    };
  },
  methods: {
    ...mapActions(["setNum"]),
    recData() {
      //列表数据获取
      var that = this;
      this.ajax.post("/xinda-api/cart/list").then(function(data) {
        var rData = data.data.data;
        that.cartLists = rData;
        var tlPay = 0;
        for (var i in that.cartLists) {
          tlPay += that.cartLists[i].totalPrice;
        }
        that.tlPay = tlPay;
      });
    },
    recomData() {
      //推荐服务列表
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 0,
            limit: 4
          })
        )
        .then(function(data) {
          var tData = data.data.data;
          that.products = tData;
          console.log(that.products);
        });
    },
    add(id) {
      //增加商品数量
      var that = this;
      this.ajax
        .post("/xinda-api/cart/add", this.qs.stringify({ id: id, num: 1 }))
        .then(function(data) {
          console.log(data);
          that.recData();
        });
    },
    minus(id, bnum) {
      //减少商品数量
      var that = this;
      // console.log(this.num)
      if (bnum - 1 >= 1) {
        var that = this;
        this.ajax
          .post("/xinda-api/cart/add", this.qs.stringify({ id: id, num: -1 }))
          .then(function(data) {
            that.recData();
            console.log(data.data);
            console.log("num", that.num);
            // console.log(data.data.data);
          });
      } else {
        this.dele(id);
        that.recData();
      }
    },
    dele(id) {
      var that = this;
      //删除
      this.ajax
        .post("/xinda-api/cart/del", this.qs.stringify({ id: id }))
        .then(function(data) {
          console.log("del", data.data);
          that.recData();
          that.ajax.post("xinda-api/cart/cart-num").then(data => {
            that.cartNum = data.data.data.cartNum;
            that.setNum(that.cartNum);
            sessionStorage.setItem(that.cartNum, that.cartNum);
          });
        });
    },
    toPay(orderNo) {
      this.$router.push({
        path: "/Order/orderdetail",
        query: { orderNo: orderNo }
      });
    },
    suBmit() {
      //结算并清空购物车
      var that = this;
      this.ajax.post("/xinda-api/cart/submit").then(function(data) {
        var rData = data.data.data;
        that.orderNo = rData;
        that.toPay(that.orderNo);
        // console.log(data);
      });

    },
    todetail(id) {//传参产品详情
      this.$router.push({
        path: "/detial",
        query: { shoppingId: id }
      });
    },
    toHomePage() {//跳转首页
      this.$router.push({
        path: "/HomePage"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Cart-content {
  width: 1200px;
  background: #fff;
  margin: 0 auto;
}
.Cart-top {
  margin-top: 20px;
  p {
    font-size: 14px;
    display: inline-block;
  }
}
.Cart-head {
  width: 100%;
  border-bottom: 1px solid #bcbdbd;
  margin-top: 25px;
  p {
    color: #74b2df;
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
  }
}

table {
  width: 1200px;
}
thead {
  width: 1200px;
  tr {
    line-height: 55px;
    font-size: 14px;
    width: 1200px;
    color: #686868;
    display: flex;
    justify-content: space-around;
    th {
      width: 200px;
      text-align: center;
    }
  }
}
.store {
  width: 1200px;
  height: 40px;
  p {
    font-size: 14px;
    color: #686868;
    margin-left: 70px;
  }
  .itemLists {
    font-size: 14px;
    background-color: #f7f7f7;
    width: 1200px;
    color: #686868;
    display: flex;
    justify-content: space-around;
    p {
      font-size: 14px;
      color: #686868;
      margin-right: 1000px;
      line-height: 40px;
    }
    td {
      width: 200px;
      line-height: 52px;
      text-align: center;
    }
    .itemPic {
      line-height: 0;
      img {
        width: 50px;
        height: 50px;
        margin: auto auto;
        border: 1px solid #eee;
      }
    }
    .serviceName {
      padding-top: 16px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 16px;
    }
    button {
      width: 20px;
      height: 20px;
      background-color: #bcbdbd;
      outline: none;
      border: none;
    }
    input {
      width: 33px;
      outline: none;
      text-align: center;
      margin-left: 3px;
    }
    .delete {
      cursor: pointer;
    }
  }
}
.sumPrice {
  color: #71afdd;
}
.tomoney {
  margin-top: 25px;
}
.total {
  font-size: 13px;
  color: #686868;
  margin-left: 980px;
  margin-bottom: 10px;
  .totalPay {
    color: #2693d4;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
  }
}
.continue {
  width: 100px;
  height: 30px;
  border: 1px solid #2693d4;
  color: #2693d4;
  background-color: #fff;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  margin-left: 950px;
}
.balance {
  width: 100px;
  height: 30px;
  border: 1px solid #2693d4;
  color: #2693d4;
  background-color: #fff;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}
.hotservice {
  width: 1200px;
  margin-top: 30px;
  p {
    width: 1200px;
    color: #2693d4;
    font-size: 16px;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #bcbdbd;
  }
  .service {
    width: 1200px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 40px;
    .serviceBox {
      width: 265px;
      height: 190px;
      border: 1px solid #bcbdbd;
      .imgs {
        width: 200px;
        height: 6px;
        margin: 5px 10px;
        background: url(../../assets/HomePageimages/Sprites.png)-219px -488px;
      }
      b {
        font-size: 14px;
        display: block;
        margin: 10px 10px;
      }
      p {
        width: 250px;
        font-size: 12px;
        color: #aaa;
        border: 0;
        margin: 10px 10px;
        padding: 0;
      }
      h2 {
        color: #2693d4;
        margin: 0px 10px;
      }
      del {
        font-size: 12px;
        color: #aaa;
        margin: 0px 10px;
      }
      span {
        margin-left: 30px;
        a {
          color: #2693d4;
          text-decoration: none;
        }
      }
    }
  }
}
</style>