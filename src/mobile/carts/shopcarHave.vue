<template>
  <div>
    <div class="top">购物车内共有
      <span>{{getNum}}</span>件商品
    </div>
    <div class="cartList" v-for="list in this.cartList" :key="list.id">
      <div class="comID">{{list.providerName}}</div>
      <div class="box">
        <div class="imgBox">
          <img :src="'http://115.182.107.203:8088/xinda/pic'+list.providerImg" alt="">
        </div>
        <div class="cartMsg">
          <p class="name">{{list.serviceName}}</p>
          <div class="price">
            <p>￥{{list.unitPrice}}</p>
            <span>元</span>
          </div>
          <div class="total">
            <p>购买数量 :</p>
            <button @click="subtraction(list.serviceId,list.buyNum)">-</button>
            <input type="text" readonly="readonly" v-model="list.buyNum">
            <button @click="add(list.serviceId)">+</button>
          </div>
          <div class="address">
            <div><img src="../../assets/mobile/addIcon.jpg" alt=""></div>
            <p>北京市</p>
            <p>朝阳区</p>
          </div>
        </div>
        <div class="del" @click="del(list.serviceId)">删除订单</div>
      </div>
    </div>
    <div class="all">
      <div></div>
      <p>共</p>
      <span>{{getNum}}</span>
      <p>件商品</p>
      <p class="scale">小计：</p>
      <span>￥{{total}}</span>
    </div>

    <div class="cartBtn">
      <div class="combined">
        <p>合计 :</p>
        <p class="totals">￥
          <span>{{total}}</span>
        </p>
      </div>
      <button @click="settlement">去结算</button>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      cartList: [],
      total: "",
      list: [],
      total: 0
    };
  },
  components: {},
  computed: {
    ...mapGetters(["getNum"])
  },
  created() {
    this.render();
  },
  methods: {
    ...mapActions(["setNum", "setwxNum"]),
    //默认渲染
    render() {
      var that = this;
      this.ajax.post("/xinda-api/cart/list").then(data => {
        this.cartList = data.data.data;
        var total = 0;
        for (var i in that.cartList) {
          total -= -that.cartList[i].totalPrice;
        }
        that.total = total;
        that.setNum(data.data.data.length);
        that.setwxNum(that.total);
      });
    },
    //删除
    del(id) {
      this.ajax
        .post("/xinda-api/cart/del", this.qs.stringify({ id: id }))
        .then(data => {
          if (data.data.status == 1) {
            MessageBox.confirm("确定删除该商品?").then(action => {
              this.render();
            });
          }
        });
    },
    //加
    add(id) {
      this.ajax
        .post(
          "/xinda-api/cart/add",
          this.qs.stringify({
            id: id,
            num: 1
          })
        )
        .then(data => {
          if (data.data.status == 1) {
            this.render();
          }
        });
    },
    //减
    subtraction(id, num) {
      if (num - 1 >= 1) {
        this.ajax
          .post(
            "/xinda-api/cart/add",
            this.qs.stringify({
              id: id,
              num: -1
            })
          )
          .then(data => {
            if (data.data.status == 1) {
              this.render();
            }
          });
      } else {
        MessageBox.alert("商品最低不能低于1件", "提示");
      }
    },
    //结算
    settlement() {
      this.ajax.post("/xinda-api/cart/submit").then(data => {
        if (data.data.status == 1) {
          this.$router.push({ path: "/m/users/myOrder" });
          this.render();
        }
      });
    }
  }
};
</script>

 <style lang="less" scoped>
.top {
  height: 0.77rem;
  font-size: 0.24rem;
  line-height: 0.77rem;
  padding: 0.05rem 0 0 0.23rem;
  box-sizing: border-box;
  color: #4c4c4c;
  background: #e5e5e5;
  span {
    color: #fe7581;
  }
}

.cartList {
  width: 100%;
  padding: 0.17rem 0.33rem 0.21rem 0.17rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #cfcfcf;
  .comID {
    width: 100%;
    height: 0.28rem;
    font-size: 0.28rem;
    line-height: 0.28rem;
    font-weight: 600;
    margin-bottom: 0.21rem;
  }
}
.box {
  display: flex;
  justify-content: space-between;
  .imgBox {
    width: 1.66rem;
    height: 1.66rem;
    padding: 0.15rem 0;
    box-sizing: border-box;
    border: 0.02rem solid #e3e3e3;
    img {
      display: block;
      width: 1.36rem;
      height: 1.36rem;
      margin: auto;
    }
  }
}
.cartMsg {
  // width: 4.15rem;
  padding-top: 0.02rem;
  box-sizing: border-box;
  .name {
    width: 2.5rem;
    height: 0.28rem;
    font-size: 0.26rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 0.28rem;
    color: #010101;
    margin-bottom: 0.29rem;
  }
  .price {
    height: 0.23rem;
    display: flex;
    margin-bottom: 0.18rem;
    p {
      font-size: 0.23rem;
      line-height: 0.23rem;
      color: #ff1514;
      margin-right: 0.18rem;
    }
    span {
      display: inline-block;
      height: 0.14rem;
      font-size: 0.14rem;
      line-height: 0.14rem;
      margin-top: 0.11rem;
      color: #676767;
    }
  }
}
.total {
  display: flex;
  p {
    display: block;
    // width: 0.98rem;
    margin-right: 0.17rem;
    height: 0.16rem;
    font-size: 0.16rem;
    line-height: 0.33rem;
    color: #252525;
  }
  button {
    width: 0.33rem;
    height: 0.31rem;
    font-size: 0.19rem;
    line-height: 0.31rem;
    text-align: center;
    color: #595353;
    background: #ededed;
    border: 0.01rem solid #c7c7c7;
  }
  input {
    width: 0.6rem;
    height: 0.31rem;
    font-size: 0.19rem;
    text-align: center;
    border: none;
    margin-bottom: 0.15rem;
  }
}
.address {
  display: flex;
  div {
    width: 0.15rem;
    height: 0.21rem;
    img {
      display: block;
      width: 0.15rem;
      height: 0.21rem;
    }
  }
  p {
    display: inline-block;
    height: 0.21rem;
    margin-left: 0.15rem;
    font-size: 0.16rem;
    line-height: 0.21rem;
    color: #242424;
  }
}
.del {
  width: 1.4rem;
  height: 0.5rem;
  border: 0.01rem solid #f56c6c;
  border-radius: 0.05rem;
  font-size: 0.23rem;
  line-height: 0.5rem;
  text-align: center;
  color: #f56c6c;
}

.all {
  margin-top: 0.17rem;
  margin-bottom: 3rem;
  height: 0.22rem;
  font-size: 0.22rem;
  display: flex;
  div {
    width: 51.467%;
  }
  p {
    color: #4b4b4b;
  }
  .scale {
    display: inline-block;
    margin-left: 0.24rem;
  }
  span {
    color: #fe2423;
  }
}

.cartBtn {
  width: 100%;
  height: 1.1rem;
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
  position: fixed;
  bottom: 0.6rem;
  .combined {
    width: 4.94rem;
    background: #e5e5e5;
    padding-left: 0.1rem;
    box-sizing: border-box;
    display: flex;
    margin: 0;
    p {
      font-size: 0.28rem;
      letter-spacing: 0.02rem;
      line-height: 1.1rem;
      margin-left: 0.2rem;
      color: #4c4c4c;
    }
    .totals {
      color: #fe0000;
    }
  }
}
button {
  width: 2.56rem;
  background: #fb2d2d;
  font-size: 0.28rem;
  color: #fff;
  text-align: center;
  line-height: 1.1rem;
  border: none;
  outline: 0;
}
</style>
