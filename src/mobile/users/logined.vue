<template>
  <!-- <div> -->
    <!-- <mt-header title="">
      <router-link to="history.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <div class="mobile">
      <div class="portrait"><img src="../../assets/mobile/h.jpg" alt=""></div>
      <div class="name">{{name}}</div>
      <div class="order e9">
        <a href="/#/m/users/myOrder">
          <img class="bgOrder" src="../../assets/mobile/ORDER.png" alt="">
          <span class="msg">我的订单</span>
          <img class="arrow" src="../../assets/mobile/arrow.png">
        </a>

      </div>
      <div class="design e9">
        <a href="/#/m/users/accountSetting">
          <img class="bgOrder" src="../../assets/mobile/account.png" alt="">
          <span class="msg">账户设置</span>
          <img class="arrow" src="../../assets/mobile/arrow.png">
        </a>

      </div>
      <a href="javascript: void(0)" class="exit" @click="exit">退出登录</a>
    </div>
  <!-- </div> -->

</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  created() {
    var that = this;
    //默认渲染
    this.ajax.post("/xinda-api/member/info").then(data => {
      this.info = data.data.data;
      that.name = this.info.name;
    });
  },
  data() {
    return {
      name: "未登录"
    };
  },
  methods: {
    exit() {
      var that = this;
      this.ajax.post("xinda-api/sso/ logout").then(data => {
        if (data.data.status == 1) {
          MessageBox.confirm("确定退出登录?").then(action => {
            that.name = "未登录";
            this.$router.push({ path: "/m" });
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.mobile {
  width: 100%;
  background: #f8f8f8;
  margin: .60rem auto 0;
  padding: 3.39rem 0.71rem 3.77rem 0.69rem;
  box-sizing: border-box;
}
.portrait {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto 1.02rem;
  img {
    width: 1.65rem;
    height: 1.65rem;
    border-radius: 50%;
  }
}
.name {
  width: 100%;
  height: 0.28rem;
  font-size: 0.28rem;
  font-weight: 700;
  text-align: CENTER;
  line-height: 0.28rem;
  margin-bottom: 0.22rem;
}
.e9 {
  width: 100%;
  height: 0.75rem;
  background-color: #e9e9e9;
  padding-right: 0.4rem;
  box-sizing: border-box;
  margin-bottom: 0.35rem;
  a {
    display: flex;
    justify-content: space-around;
    color: #9c9c9c;
  }
  .bgOrder {
    display: inline-block;
    width: 0.41rem;
    height: 0.4rem;
    margin: 0.17rem 0 0;
    img {
      width: 0.41rem;
      height: 0.4rem;
    }
  }
  .msg {
    font-size: 0.28rem;
    line-height: 0.75rem;
  }
  .arrow {
    display: block;
    width: 0.15rem;
    height: 0.3rem;
    margin-top: 0.24rem;
  }
}
.exit {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 0.75rem;
  width: 100%;
  height: 0.75rem;
  border: 0.01rem solid #2693d4;
  border-radius: 0.04rem;
  background: #2693d4;
  font-size: 0.28rem;
  font-weight: 600;
  line-height: 0.75rem;
  color: #fff;
  font-family: "宋体";
  margin-top: 0.65rem;
}

.mint-header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #2693d4;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 0.28rem;
  height: .77rem;
  line-height: .77rem;
  // padding: 0 0.01rem;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
</style>
