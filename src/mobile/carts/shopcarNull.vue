<template>
    <div>
        <p class="top">购物车内共有
            <span>{{getwxNum}}</span>件商品
        </p>
        <div class="empty">
             <div class="cartNull"><img src="../../assets/mobile/nullCart.jpg" alt=""></div>
             <p class="tishi">购物车空空如也，去首页逛逛吧！</p>
             <router-link class="goIndex" to="/m">去首页</router-link>
        </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["getwxNum"])
  }
};
</script>

 <style lang="less" scoped>
 .top {
     height: .77rem;
    font-size: .24rem;
    line-height: .77rem;
    padding: .05rem 0 0 .23rem;
    box-sizing: border-box;
    color: #4c4c4c;
    background: #e5e5e5;
    span {
      color: #fe7581;
    }
  }
.empty {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  padding-top: 2.52rem;
  box-sizing: border-box;
  .cartNull {
    img {
      width: 3.36rem;
      height: 3.17rem;
      margin-left: 1.96rem;
    }
  }
  p{
      width: 100%;
      height: .28rem;
      margin: .30rem 0 1rem;
      font-size: .28rem;
      color: #2694d1;
      letter-spacing: .02rem;
      line-height: .28rem;
      text-align: center;
  }
  .goIndex{
      display: block;
      width: 2.57rem;
      height: .85rem;
      margin: 0 auto 5.24rem;
      font-size: .28rem;
      color: #fff;
      line-height: .85rem;
      text-align: center;
      background: #2693d4;
  }
}
</style>
