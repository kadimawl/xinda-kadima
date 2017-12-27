<template>
  <div>
    <div class="shopD" v-for="product in products" :key="product.code">
      <div class="deTails">
        <div class="picture">
          <img :src="'http://115.182.107.203:8088/xinda/pic'+product.img" alt="">
        </div>
        <div class="infor" v-for="pvdpdt in pvdpdts" :key="pvdpdt.code">
          <b>{{pvdpdt.serviceName}}</b>
          <p>{{pvdpdt.serviceInfo}}</p>
        </div>
        <p class="area" v-for="region in regions" :key="region">区域：{{region}}</p>
        <p class="price" v-for="pvdpdt in pvdpdts" :key="pvdpdt.code">价格：
          <b>￥{{pvdpdt.price}}</b>
          <del v-for="product in products" :key="product.code">￥{{product.marketPrice}}</del>
        </p>
      </div>
      <div class="service-Co">
        <div class="title">服务商家</div>
        <div class="Co-inf">
          <div class="inf-content" v-for="provider in providers" :key="provider.id">
            <div class="inf-pic">
              <img :src="'http://115.182.107.203:8088/xinda/pic'+provider.providerImg" alt="">
            </div>
            <div class="inf-text" v-for="provider in providers" :key="provider.id">
              <p>{{provider.name}}</p>
              <p>信誉:
                <span></span>
              </p>
              <p v-for="region in regions" :key="region">区域：{{region}}</p>
              <p v-for="proBu in proBus" :key="proBu.id">累计服务客户数量：{{proBu.serviceNum}}</p>
              <div @click="toStore(provider.id)">进入店铺</div>
            </div>
          </div>
          <div class="inf-icon">
            <div class="icon"></div>
            <p>金牌服务商</p>
          </div>
        </div>
      </div>
      <div class="service-Content">
        <div class="title">服务介绍</div>
        <div class="content-inf" v-html="serInf"></div>
      </div>
    </div>
    <div class="evaluate">
      <div class="title">用户评价</div>
      <div class="evaDetail">
        <div class="userPic"></div>
        <div class="userEva">
          <p>满意度：
            <span></span>
          </p>
          <p>评价：服务热情周到！</p>
        </div>
      </div>
      <div class="evaDetail">
        <div class="userPic"></div>
        <div class="userEva">
          <p>满意度：
            <span></span>
          </p>
          <p>评价：服务热情周到！</p>
        </div>
      </div>
    </div>
    <div class="buttons" v-for="pvdpdt in pvdpdts" :key="pvdpdt.code">
      <div class="call" @click="popupCall">
        <div class="call-pic"></div>
        <p>联系商家</p>
      </div>
      <div class="addCart" @click="addCart(pvdpdt.id)">加入购物车</div>
      <div class="buyNow" @click="toPay(pvdpdt.id)">立即购买</div>
    </div>
    <div class="popup-call" v-show="popHide">
      <div class="head">
        免费电话咨询
        <div class="close" @click="popupClose"></div>
      </div>
      <p>本次电话咨询完全免费我们将对您的号码严格保密，请放心使用！</p>
      <input class="phone" type="text" placeholder="请输入手机号码">
      <div class="code">
        <input type="text">
        <div class="codePic"></div>
      </div>
      <div class="msgCode">
        <input type="text">
        <div class="getMsg">点击获取</div>
      </div>
      <div class="freeCall" @click="Calling">免费咨询</div>
    </div>
    <div class="calling" v-show="callingHide">
      <div class="head">
        免费电话咨询
        <div class="close" @click="callingClose"></div>
      </div>
      <p>本次电话咨询完全免费我们将对您的号码严格保密，请放心使用！</p>
      <p class="notice">正在为您接通电话</p>
      <p class="notice">请您注意接听来电</p>
    </div>
    <div class="cartNotice" v-show="success">加入成功</div>
  </div>
</template>

<script>
import plugins from "../../plugins";
import { MessageBox } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getName"])
  },
  created() {
    var id = this.$route.query.sId;
    var that = this;
    this.ajax
      .post(
        "/xinda-api/product/package/detail",
        this.qs.stringify({
          sId: id
        })
      )
      .then(function(data) {
        var rData = data.data.data;
        that.Products = rData;
        that.products.push(rData.product);
        that.providers.push(rData.provider);
        that.pvdpdts.push(rData.providerProduct);
        that.regions.push(rData.regionText);
        that.proBus.push(rData.providerBusiness);
        that.serInf = that.pvdpdts[0].serviceContent;
      });
  },
  methods: {
    isLogged(id) {
      //判断是否登录
      var that = this;
      this.ajax.post("/xinda-api/sso/login-info").then(data => {
        if (data.data.status == 0) {
          MessageBox.confirm("请先进行登录, 是否继续?").then(action => {
            this.$router.push({
              path: "/m/users/mobileLogin",
              query: {
                redirect: "/m/shop/shopDetail",
                id: this.$route.query.sId
              }
            });
          });
        } else {
          plugins(id, that, "/m/carts/Have"); //立即购买公共方法
        }
      });
    },
    popupCall() {
      //联系商家弹窗
      this.popHide = true;
    },
    popupClose() {
      //联系商家弹窗关闭
      this.popHide = false;
    },
    Calling() {
      //免费接通弹窗
      this.popHide = false;
      this.callingHide = true;
    },
    callingClose() {
      //免费接通弹窗关闭
      this.callingHide = false;
    },
    toStore(id) {
      //跳转店铺详情
      this.$router.push({
        path: "/m/store/Home",
        query: { storeId: id }
      });
    },
    toPay: function(id) {
      //立即购买
      var that = this;
      this.isLogged(id);
    },

    addCart: function(id) {
      var that = this;
      this.ajax.post("/xinda-api/sso/login-info").then(data => {
        if (data.data.status == 0) {
          MessageBox.confirm("请先进行登录, 是否继续?").then(action => {
            this.$router.push({
              path: "/m/users/mobileLogin",
              query: {
                redirect: "/m/shop/shopDetail",
                id: this.$route.query.sId
              }
            });
          });
        } else {
          this.ajax
            .post("/xinda-api/cart/add", this.qs.stringify({ id: id, num: 1 }))
            .then(function(data) {
              that.success = true;
            });
          setInterval(() => {
            that.success = false;
          }, 1000);
        }
      });
    }
  },
  data() {
    return {
      products: [],
      providers: [],
      pvdpdts: [],
      regions: [],
      proBus: [],
      serInf: "",
      popHide: false,
      callingHide: false,
      success: false
    };
  }
};
</script>

<style lang="less" scoped>
.shopD {
  margin-top: 0.6rem;
  width: 100%;
}
.deTails {
  width: 100%;
  height: 6.1rem;
  border-bottom: 0.04rem solid #ccc;
  position: relative;
  .picture {
    width: 100%;
    height: 4.75rem;
    img {
      width: 100%;
      height: 4.75rem;
    }
  }
  .infor {
    width: 100%;
    height: 1.17rem;
    display: flex;
    flex-direction: column;
    background-color: rgba(82, 87, 88, 0.7);
    position: absolute;
    bottom: 22%;
    left: 0%;
    b {
      font-size: 0.3rem;
      color: #fff;
      margin-left: 0.4rem;
      margin-top: 0.15rem;
    }
    p {
      font-size: 0.2rem;
      color: #fff;
      margin-top: 0.2rem;
      margin-left: 0.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .area {
    width: 90%;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.2rem;
    border-bottom: 0.01rem solid #ccc;
    margin: 0 auto;
  }
  .price {
    width: 80%;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.2rem;
    margin-left: 0.4rem;
    b {
      font-size: 0.3rem;
      color: red;
      margin-right: 0.3rem;
    }
  }
}
.title {
  width: 90%;
  height: 0.6rem;
  font-size: 0.2rem;
  font-weight: 700;
  line-height: 0.6rem;
  border-bottom: 0.02rem solid #2693d4;
  margin: 0 auto;
}
.service-Co {
  width: 100%;
  height: 3.2rem;
  border-bottom: 0.04rem solid #ccc;
  .Co-inf {
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    .inf-content {
      width: 90%;
      height: 2rem;
      display: flex;
      .inf-pic {
        width: 1.5rem;
        height: 1.5rem;
        img {
          width: 1.5rem;
          height: 1rem;
          margin-top: 0.5rem;
        }
      }
      .inf-text {
        width: 70%;
        height: 2rem;
        p {
          font-size: 0.2rem;
          margin: 0.1rem 0.4rem;
          span {
            display: inline-block;
            width: 1.05rem;
            height: 0.14rem;
            background: url(../../assets/HomePageimages/diamonds_03.png);
            background-size: 100% 100%;
          }
        }
        div {
          width: 1rem;
          height: 0.28rem;
          border: 0.01rem solid #2693d4;
          border-radius: 0.03rem;
          font-size: 0.2rem;
          color: #2693d4;
          text-align: center;
          line-height: 0.28rem;
          margin-left: 0.4rem;
          cursor: pointer;
        }
      }
    }
    .inf-icon {
      width: 90%;
      height: 0.4rem;
      display: flex;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        background: url(../../assets/HomePageimages/icon03.png) no-repeat;
        background-size: 100% 100%;
      }
      p {
        font-size: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
}
.service-Content {
  width: 100%;
  // height: 3.85rem;
  border-bottom: 0.04rem solid #ccc;
  .content-inf {
    width: 90%;
    // height: 3.25rem;
    margin: 0 auto;
    font-size: 0.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
}
.evaluate {
  width: 100%;
  margin-bottom: 1.2rem;
  border-bottom: 0.04rem solid #ccc;
  .evaDetail {
    width: 90%;
    margin: 0 auto;
    display: flex;
    padding-bottom: 0.2rem;
    .userPic {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: url(../../assets/HomePageimages/user.jpg);
      background-size: 100% 100%;
      margin-top: 0.2rem;
    }
    .userEva {
      width: 70%;
      margin-top: 0.2rem;
      margin-left: 0.3rem;
      p {
        font-size: 0.2rem;
        span {
          display: inline-block;
          width: 1.05rem;
          height: 0.14rem;
          background: url(../../assets/HomePageimages/stars_03.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.buttons {
  width: 100%;
  height: 1.15rem;
  display: flex;
  position: fixed;
  bottom: 0;
  .call {
    width: 34%;
    height: 1.15rem;
    background-color: #edeff2;
    cursor: pointer;
    .call-pic {
      width: 0.5rem;
      height: 0.4rem;
      margin: 0.2rem auto;
      background: url(../../assets/HomePageimages/call_07.png);
      background-size: 100% 100%;
    }
    p {
      font-size: 0.2rem;
      text-align: center;
    }
  }
  .addCart {
    width: 33%;
    height: 1.15rem;
    color: #fff;
    font-size: 0.3rem;
    line-height: 1.15rem;
    text-align: center;
    background-color: #2693d4;
    cursor: pointer;
  }
  .buyNow {
    width: 33%;
    height: 1.15rem;
    color: #fff;
    font-size: 0.3rem;
    line-height: 1.15rem;
    text-align: center;
    background-color: #fc4145;
    cursor: pointer;
  }
}
.popup-call {
  width: 90%;
  height: 8rem;
  border: 0.01rem solid #ccc;
  background-color: #fff;
  position: fixed;
  top: 20%;
  left: 5%;
  .head {
    width: 100%;
    height: 1rem;
    background-color: #2693d4;
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
    position: relative;
    .close {
      width: 0.5rem;
      height: 0.5rem;
      background: url(../../assets/HomePageimages/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  p {
    width: 80%;
    margin: 0.3rem auto;
    font-size: 0.3rem;
  }
  .phone {
    width: 80%;
    height: 0.8rem;
    display: block;
    margin: 0 auto;
    outline: none;
    border-radius: 0.1rem;
    border-bottom: 0.01rem solid #ccc;
    font-size: 0.3rem;
  }
  .code {
    width: 80%;
    height: 0.8rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    input {
      display: block;
      width: 60%;
      height: 0.8rem;
      outline: none;
      border-radius: 0.1rem;
      border-bottom: 0.01rem solid #ccc;
      font-size: 0.3rem;
    }
    .codePic {
      width: 30%;
      height: 0.8rem;
      margin-left: 0.5rem;
      background: url(../../assets/HomePageimages/code.png);
      background-size: 100% 100%;
    }
  }
  .msgCode {
    width: 80%;
    height: 0.8rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    input {
      display: block;
      width: 60%;
      height: 0.8rem;
      outline: none;
      border-radius: 0.1rem;
      border-bottom: 0.01rem solid #ccc;
      font-size: 0.3rem;
    }
    .getMsg {
      width: 30%;
      height: 0.8rem;
      margin-left: 0.5rem;
      border-radius: 0.1rem;
      border: 0.01rem solid #2693d4;
      font-size: 0.3rem;
      color: #2693d4;
      text-align: center;
      line-height: 0.8rem;
      cursor: pointer;
    }
  }
  .freeCall {
    width: 80%;
    height: 0.8rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    border-radius: 0.1rem;
    border: 0.01rem solid #2693d4;
    font-size: 0.4rem;
    color: #2693d4;
    text-align: center;
    line-height: 0.8rem;
    cursor: pointer;
  }
}
.calling {
  width: 90%;
  height: 4.3rem;
  border: 0.01rem solid #ccc;
  background-color: #fff;
  position: fixed;
  top: 30%;
  left: 5%;
  .head {
    width: 100%;
    height: 1rem;
    background-color: #2693d4;
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
    position: relative;
    .close {
      width: 0.5rem;
      height: 0.5rem;
      background: url(../../assets/HomePageimages/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  p {
    width: 80%;
    margin: 0.3rem auto;
    font-size: 0.3rem;
  }
  .notice {
    width: 80%;
    margin: 0.3rem auto;
    font-size: 0.4rem;
    color: #2693d4;
    text-align: center;
  }
}
.cartNotice {
  width: 30%;
  height: 2rem;
  font-size: 0.3rem;
  color: #fff;
  line-height: 2rem;
  text-align: center;
  border: 0.01rem solid #ccc;
  background-color: rgba(82, 87, 88, 0.7);
  position: fixed;
  top: 45%;
  left: 35%;
}
</style>