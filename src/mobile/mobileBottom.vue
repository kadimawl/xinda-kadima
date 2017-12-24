<template>
    <div class="mBottom">
        <ul>
            <router-link class="original" active-class="activeB" to="/m/shop" @click="index">
                <img src="../assets/mobile/btmhomeG.png" alt="" v-show="!indexImg">
                <img src="../assets/mobile/btmhomeB.png" alt="" v-show="indexImg">
                <p>首页</p>
            </router-link>
            <router-link class="original" active-class="activeB"  to="/m" @click="shop">
                <img src="../assets/mobile/btmlistG.png" alt="" v-show="!shopImg">
                <img src="../assets/mobile/btmlistB.png" alt="" v-show="shopImg">
                <p >店铺</p>
            </router-link>
            <router-link class="original" active-class="activeB"  to="/m" @click="cart">
                <img src="../assets/mobile/btmcart.png" alt="" v-show="!cartImg">
                <img src="../assets/mobile/blueCart.png" alt="" v-show="cartImg">
                <p >购物车</p>
            </router-link>
            <router-link class="original" active-class="activeB"  to="/m/mobile" @click="mine">
                <img src="../assets/mobile/btmmine.png" alt="" v-show="!mineImg">
                <img src="../assets/mobile/blueMine.png" alt="" v-show="mineImg">
                <p>我的</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      indexImg: false,
      shopImg: '',
      cartImg: '',
      mineImg: ''
    };
  },
  methods: {
      index(){
          this.indexImg = true;
      },
      shop(){
          this.shopImg = true;
      },
      cart(){
          this.cartImg = true;
      },
      mine(){
          this.mineImg = true;
      },
  }
};
</script>

<style lang="less" >
* {
  margin: 0;
  padding: 0;
}
.mBottom {
  height: 0.88rem;
  width: 100%;
  border-top: 0.02rem solid #f9f9f9;
}
ul {
  width: 100%;
  display: flex;
  list-style: none;
}
.original{
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
  p {
    width: 100%;
    height: 0.23rem;
    font-size: 0.23rem;
    text-align: center;
    line-height: 0.23rem;
  }
}

// .activeB{
//     color: #2693d4;
// }
</style>
