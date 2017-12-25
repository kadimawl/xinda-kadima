<template>
    <div>
        <div class="top">购物车内共有
            <span>{{getwxNum}}</span>件商品
        </div>
        <div class="cartList" v-for="list in this.cartList" :key="list.buyNum">
            <div class="comID">{{list.providerName}}</div>
            <div class="box">
                <div class="imgBox"><img :src="'http://115.182.107.203:8088/xinda/pic'+list.providerImg" alt=""></div>
                <div class="cartMsg">
                    <p class="name">{{list.serviceName}}</p>
                    <div class="price">
                        <p>￥{{list.unitPrice}}</p>
                        <span>元</span>
                    </div>
                    <div class="total">
                        <p>购买数量 :</p>
                        <div>-</div>
                        <input type="text" v-model="list.buyNum">
                        <div>+</div>
                    </div>
                    <div class="address">
                        <div><img src="../../assets/mobile/addIcon.jpg" alt=""></div>
                        <p>北京市</p><p>朝阳区</p>
                    </div>
                </div>
                <div class="del" @click="del">删除订单</div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cartList: [],
      total: "",
      list: []
    };
  },
  components: {},
  computed: {
    ...mapGetters(["getwxNum"])
  },
  created() {
      var that =this;
    this.ajax.post("/xinda-api/cart/list").then(data => {
      this.cartList = data.data.data;
    //   for(var key in that.cartList){
    //       that.list += that.cartList[key].id
    //   }
    //   console.log(this.list)
    });
  },
  methods: {
    //   del(id) {
    //       this.ajax.post('/xinda-api/cart/del',this.qs.stringify({id: id})).then(data=>{console.log(data.data)})
    //   }
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
  .imgBox {
    width: 1.66rem;
    height: 1.66rem;
    border: 0.02rem solid #e3e3e3;
    margin-right: 0.18rem;
    img {
      width: 1.66rem;
      height: 1.66rem;
    }
  }
}
.cartMsg {
  width: 4.15rem;
  padding-top: 0.02rem;
  box-sizing: border-box;
  .name {
    height: 0.28rem;
    font-size: 0.28rem;
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
    width: 0.98rem;
    height: 0.16rem;
    font-size: 0.16rem;
    line-height: 0.33rem;
    color: #252525;
  }
  div {
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
    width: 0.37rem;
    height: 0.33rem;
    font-size: 0.19rem;
    text-align: center;
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
    margin-top: 0.05rem;
    height: 0.16rem;
    margin-left: 0.15rem;
    font-size: 0.16rem;
    color: #242424;
  }
}
.del {
  font-size: 0.23rem;
  line-height: 0.23rem;
  color: #fe0000;
}
</style>
