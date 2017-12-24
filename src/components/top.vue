<template>
  <div class="Top">
    <!-- 未登录顶部 -->
    <div class="topBox notLoggedIn">
      <div class="box-left" v-show="!getName">
        <p class="w-come">欢迎来到信达！</p>
        <div class="please">
          <p>请</p>
          <div @click="login">
            <a href="/#/outter/login">登录</a>
          </div>
        </div>
        <div class="item-reg" @click="register">
          <a href="/#/outter/register">快速注册</a>
        </div>
      </div>
      <div class="box-left" v-show="getName">
        <a href="/#/member" class="username">{{getName}}</a>
        <p class="w-come">欢迎来到信达！</p>
        <a href="javascript:void(0)" class="exit" @click="exit">【退出】</a>
      </div>
      <div class="box-right">
        <div class="shop-cart">
          <!-- <a class="cartLink" href="/#/tabs/shoppingCart"> -->
          <span class="bgCart"></span>
          <el-button type="text" class="cartBut" @click="cartBut">
            <p>购物车
              <span>{{getNum}}</span> 件</p>
          </el-button>
          <!-- </a> -->
        </div>
        <div class="myOrder " v-show="getName">
          <span class="bgOrder"></span>
          <a href="#/member/memberBody">我的订单</a>
        </div>
        <div class="entrance">
          <a href="#/shopIndex">服务商入口</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import isLogged from "../isLogged";
export default {
  created() {
    var that = this;
    if (this.getName) {
      this.ajax.post("xinda-api/cart/cart-num").then(data => {
        var cartNum = data.data.data.cartNum;
        that.setNum(cartNum);
      });
    }
  },
  data() {
    return {
      ligined: false,
      lR: true,
      name: ""
    };
  },
  computed: {
    ...mapGetters(["getNum", "getName"]) //{getNum:function(){}}
  },
  methods: {
    ...mapActions(["setTitle", "setName", "setNum"]),
    login() {
      this.setTitle("欢迎登录");
    },
    register() {
      this.setTitle("欢迎注册");
    },
    exit() {
      sessionStorage.clear();
      location.reload();
    },
    cartBut() {
      if (this.getName) {
        this.$router.push({ path: "/tabs/shoppingCart" });
      } else {
        this.$alert("请先进行登录", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({ path: "/outter/login" });
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@69c: #69c;
.Top {
  background: rgba(242, 242, 242, 0.6);
  padding: 0 20px;
}
.topBox {
  font-size: 14px;
  max-width: 1178px;
  height: 35px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  line-height: 35px;
  letter-spacing: 1px;
  a {
    text-decoration: none;
  }
  .box-left {
    width: 50%;
    display: flex;
    .w-come {
      font-family: "Arial Normal", "Arial";
      font-weight: 400;
      color: #333;
    }
    .please {
      display: flex;
      margin: 0 24px 0 16px;
      a {
        color: @69c;
      }
    }
    .item-reg {
      a {
        color: @69c;
      }
    }
  }

  .box-right {
    text-align: right;
    width: 29%;
    display: flex;
    .shop-cart {
      display: flex;
      span {
        color: @69c;
      }
      .cartBut {
        color: #000;
      }
    }
    .entrance {
      margin-left: 17px;
      a {
        color: @69c;
      }
    }
  }
}

.bgCart {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-top: 10px;
  background: url(../assets/index/Sprites.png) 0 -73px;
}
.box-Right {
  display: flex;
  width: 29%;
  text-align: right;
  .shop-cart {
    display: flex;
    span {
      color: @69c;
    }
  }
  .entrance {
    margin-left: 17px;
    a {
      color: @69c;
    }
  }
}
.bgCart {
  margin-left: 10px;
}

.bgOrder {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
  background: url(../assets/index/u619.png) no-repeat;
}

.myOrder {
  a {
    color: #000;
  }
}
.exit {
  color: #000;
}
.username {
  display: inline-block;
  color: @69c;
  margin-right: 10px;
}
.cartLink {
  display: flex;
  color: #000;
}
</style>
