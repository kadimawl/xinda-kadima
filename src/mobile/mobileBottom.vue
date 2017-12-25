<template>
  <div class="mBottom">
    <ul>
      <li @click="index">
        <router-link class="original" active-class="activeB" to="/m/mIndex">
        <img src="../assets/mobile/btmhomeG.png" alt="" v-show="indexImg">
        <img src="../assets/mobile/btmhomeB.png" alt="" v-show="!indexImg">
        <p>首页</p>
        </router-link>
      </li>
      <li @click="shop">
        <router-link class="original" active-class="activeB" to="/m/shop/shopDetail">
        <img src="../assets/mobile/btmlistG.png" alt="" v-show="shopImg">
        <img src="../assets/mobile/btmlistB.png" alt="" v-show="!shopImg">
        <p>店铺</p>
        </router-link>
      </li>
      <li @click="cart">
        <router-link class="original" active-class="activeB" to="/m/carts/Have">
        <img src="../assets/mobile/btmcart.png" alt="" v-show="cartImg">
        <img src="../assets/mobile/blueCart.png" alt="" v-show="!cartImg">
        <p>购物车</p>
        </router-link>
      </li>
      <li @click="mine">
        <router-link class="original" active-class="activeB" to="/m/users/mobile">
        <img src="../assets/mobile/btmmine.png" alt="" v-show="mineImg">
        <img src="../assets/mobile/blueMine.png" alt="" v-show="!mineImg">
        <p>我的</p>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexImg: false,
      shopImg: true,
      cartImg: true,
      mineImg: true
    };
  },
  methods: {
    index() {
      console.log("index");
      this.indexImg = false;
    },
    shop() {
      this.shopImg = false;
    },
    cart() {
      this.cartImg = false;
    },
    mine() {
      this.mineImg = false;
    }
  }
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
}
.original {
  width: 25%;
  height: 0.88rem;
  color: #b0b0b2;
  cursor: pointer;
  img {
    display: block;
    width: 0.36rem;
    height: 0.36rem;
    margin: 0.1rem auto 0.12rem;
  }
}
p {
  width: 100%;
  height: 0.23rem;
  font-size: 0.23rem;
  text-align: center;
  line-height: 0.23rem;
}

.activeB {
  color: #2693d4;
}
</style>
