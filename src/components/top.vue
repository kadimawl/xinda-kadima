<template>
  <div class="Top">
    <!-- 未登录顶部 -->
    <div class="topBox notLoggedIn">
      <div class="box-left" v-show="!getName">
        <p class="w-come">欢迎来到信达！</p>
        <div class="please">
          <p>请</p>
          <div @click="login">
            <router-link class="color69" to="/outter/login">登录</router-link>
          </div>
        </div>
        <div class="item-reg" @click="register">
          <router-link class="color69" to="/outter/register">快速注册</router-link>
        </div>
      </div>
      <div class="box-left" v-show="getName">
        <router-link to="/member"  class="username" >{{getName}}</router-link>
        <p class="w-come">欢迎来到信达！</p>
        <p class="exit" @click="exit">【退出】</p>
      </div>
      <div class="box-right">
        <div class="shop-cart"  @click="cartBut">
          <span class="bgCart"></span>
          <el-button type="text" class="cartBut">
            <p>购物车
              <span>{{getNum}}</span> 件</p>
          </el-button>
        </div>
        <div class="myOrder " v-show="getName">
          <span class="bgOrder"></span>
          <router-link to="/member/memberBody"  class="myOrder" >我的订单</router-link>
        </div>
        <div class="entrance">
          <router-link to="/shopIndex"  class="entranceR" >服务商入口</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {MessageBox,Button} from 'element-ui'
export default {
  component :{
    [Button.name]: Button
  },
  created() {
    var that = this;
     this.ajax.post("/xinda-api/sso/login-info").then(data => {
        if (data.data.status != 0) {
          this.ajax.post("/xinda-api/cart/cart-num").then(data => {
            var cartNum = data.data.data.cartNum;
            that.setNum(cartNum);
          });
        }
    })
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
      this.ajax.post('/xinda-api/sso/ logout').then(data=>console.log(data.data))
      sessionStorage.clear();
      this.setNum(0);
      location.reload();
      
    },
    cartBut() {
      if (this.getName) {
        this.$router.push({ path: "/tabs/shoppingCart" });
      } else {
        MessageBox.confirm("请先进行登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              path: "/outter/login",
              query: { redirect: "/tabs/shoppingCart" }
            });
          })
          .catch(() => {});
        
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
      .color69 {
        color: @69c;
      }
    }
    .item-reg {
      .color69 {
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
      padding-top: 3px;
      box-sizing: border-box;
      .entranceR {
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
  background: url(../assets/cart.png)  no-repeat;
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
  .myOrder {
    color: #000;
  }
}
.exit {
  color: #000;
  cursor: pointer;
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
