<template>
  <div class="mBottom">
    <ul>
      <li>
        <router-link class="index" active-class="indexChange" to="/m/mIndex">
          <div class="bg index"></div>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link class="shop" active-class="shopChange" to="/m/store/List">
          <div class="bg shop"></div>
          <p>店铺</p>
        </router-link>
      </li>
      <li>
        <router-link class="cart" active-class="cartChange" :to="cartRoute">
          <div class="bg cart"></div>
          <p>购物车</p>
        </router-link>
      </li>
      <li>
        <router-link class="mine" active-class="mineChange" :to="routes">
          <div class="bg mine"></div>
          <p>我的</p>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
const mineRoute = ["/m/users/logined", "/m/users/mobile"];
const cartList = ['/m/carts/Have','/m/carts/Null']
export default {
  data() {
    return {
      routes: mineRoute[0],
      cartRoute: cartList[1]
    };
  },
  created() {
    //判断是否登录
    this.ajax.post("/xinda-api/sso/login-info").then(data => {
      if (data.data.status == 0) {
        this.routes = mineRoute[1];
      }
    });
    //判断是否购物车为空
    this.ajax.post('/xinda-api/cart/list').then(data=>{
      if(data.data.data.length != 0){
        this.cartRoute = cartList[0]
      }
    })
  },
  methods: {}
};
</script>

<style lang="less" >
* {
  margin: 0;
  padding: 0;
}
.mBottom {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  height: 0.88rem;
  width: 100%;
  border-top: 0.02rem solid #f9f9f9;
}
ul {
  width: 100%;
  display: flex;
  list-style: none;
}
li {
  width: 25%;
  height: 0.88rem;
  cursor: pointer;
  p {
    width: 100%;
    height: 0.23rem;
    font-size: 0.23rem;
    text-align: center;
    line-height: 0.23rem;
  }
}
.bg {
  display: block;
  width: 0.36rem;
  height: 0.36rem;
  margin: 0.1rem auto 0.12rem;
  background-repeat: no-repeat;
}
.index {
  color: #b0b0b2;
  .index {
    background: url(../assets/mobile/btmhomeG.png);
    background-size: contain;
  }
}
.indexChange {
  color: #2693d4;
  .index {
    background: url(../assets/mobile/btmhomeB.png) no-repeat;
    background-size: contain;
  }
}
.shop {
  color: #b0b0b2;
  .shop {
    background: url(../assets/mobile/btmlistG.png) no-repeat;
    background-size: contain;
  }
}
.shopChange {
  color: #2693d4;
  .shop {
    background: url(../assets/mobile/btmlistB.png);
    background-size: contain;
  }
}
.cart {
  color: #b0b0b2;
  .cart {
    background: url(../assets/mobile/btmcart.png) no-repeat;
    background-size: contain;
  }
}
.cartChange {
  color: #2693d4;
  .cart {
    background: url(../assets/mobile/blueCart.png) no-repeat;
    background-size: contain;
  }
}
.mine {
  color: #b0b0b2;
  .mine {
    background: url(../assets/mobile/btmmine.png) no-repeat;
    background-size: contain;
  }
}
.mineChange {
  color: #2693d4;
  .mine {
    background: url(../assets/mobile/blueMine.png) no-repeat;
    background-size: contain;
  }
}
</style>
