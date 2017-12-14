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
            <p>(1)</p>
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
          <tbody>
            <tr class="store">
              <p>店铺：</p>
            </tr>
            <tr class="itemLists">
              <td class="itemPic"><img src="" alt=""></td>
              <td>代理记账</td>
              <td>￥1200</td>
              <td>
                <button @click="minus()">-</button>
                <input type="text" v-model="num" @blur="numC">
                <button @click="add()">+</button>
              </td>
              <td class="sumPrice" >￥1200</td>
              <td class="delete">
                <div>删除</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="tomoney">
          <div class="total">金额总计：
            <p class="totalPay">￥800.00</p>
          </div>
          <button class="continue">继续购物</button>
          <button class="balance">去结算</button>
        </div>
        <div class="hotservice">
          <p>热门服务</p>
          <div class="service">
            <div class="serviceBox" v-for="product in products" :key="product.id">
              <b>{{product.serviceName}}</b>
              <div class="imgs"></div>
              <p>{{product.serviceInfo}}</p>
              <p>销量：{{product.buyNum}}</p>
              <h2>￥{{product.marketPrice}}</h2>
              <del>原价：￥250000</del>
              <span>
                <a href="">查看详情>>></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  created() {
    var that = this;
    this.ajax.post("/xinda-api/recommend/list").then(function(data) {
      var tData = data.data.data.hq;
      that.products = tData;
    });
    // this.ajax.post("/xinda-api/cart/list").then(function(data) {
    //   var tData = data.data.data;
    //   that.cartLists = rData;
    // });
  },
  data() {
    return {
      products: [],
      cartLists: [],
      num: 1,
    };
  },
  methods: {
    add() {
      this.num -= -1;  //<最大库存
      console.log(this.num);
    },
    minus(){   //减
      if(this.num>=1){
        this.num -= 1;  //>1，否则没有该商品
      }
      console.log(this.num);
    },
    numC() {   //加
      console.log(this.num);
    },
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
  }
}
tbody {
  width: 1200px;
  .store {
    width: 1200px;
    height: 40px;
    p {
      font-size: 14px;
      color: #686868;
      margin-left:70px;
    }
  }
  .itemLists {
    font-size: 14px;
    background-color: #f7f7f7;
    line-height: 55px;
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
    .itemPic {
      width: 50px;
      height: 50px;
      border: 1px solid #eee;
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