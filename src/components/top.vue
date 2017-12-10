<template>
<div class="Top">
  <div class="topBox">
    <div class="box-left">
      <p class="w-come">欢迎来到信达！</p>
      <div class="please">
        <p>请</p>
        <div @click="login"><a href="#">登录</a></div>
      </div>
      <div class="item-reg" @click="register">
        <a href="#">快速注册</a>
      </div>
    </div>
    <div class="box-right">
      <div class="shop-cart"><p><span></span>购物车<span>0</span>件</p></div>   
      <div class="entrance"><a href="#">服务商入口</a></div>
    </div>
    
  </div>
</div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {

  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getNum'])//{getNum:function(){}}
  },
  methods:{
    ...mapActions(['setTitle']),
    login() {
      this.$router.push({path: '/outter/login'});
      this.setTitle('欢迎登录')
    },
    register() {
      this.$router.push({path: '/outter/register'});
      this.setTitle('欢迎注册')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
*{
  margin: 0;
  padding: 0;
}
@69c: #69c;
.Top{
  background: rgba(242, 242, 242, 0.6);
  padding:  0 20px;
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
    width: 20%;
    display: flex;
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
}

.bgCart{
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-top: 10px;
  background: url(../assets/index/Sprites.png) 0 -73px ;
}
</style>
