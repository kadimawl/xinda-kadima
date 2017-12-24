<template>
  <div class="mobile">
    <div class="portrait"></div>
    <div class="buttonSum">
      <a href="/#/m/users/mobileRegister">注册</a>
      <a href="/#/m/users/mobileLogin">登录</a>
    </div>
    <div class="order e9">
      <a href="/#/m/users/myOrder">
        <span class="bg"></span>
        <span class="msg">我的订单</span>
        <span class="arrow"></span>
      </a>

    </div>
    <div class="design e9">
      <a href="/#/m/users/accountSetting">
        <span class="bg"></span>
        <span class="msg">账户设置</span>
        <span class="arrow"></span>
      </a>

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.mobile {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  margin: 0 auto;
  padding: 2.80rem .71rem 0 .66rem;
  box-sizing: border-box;
}
.portrait {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
}
.buttonSum {
  margin: .26rem auto 1.63rem;
  width: 3.50rem;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    text-align: center;
    line-height: .59rem;
    width: 1.53rem;
    height: .59rem;
    border-radius: 4px;
    background: #2693d4;
    font-size: .28rem;
    font-weight: 600;
    color: #fff;
    font-family: "宋体";
  }
}
.e9 {
  width: 100%;
  height: .75rem;
  background-color: #e9e9e9;
  padding-right: .40rem;
  box-sizing: border-box;
  margin-bottom: 4.58rem;
  a {
    display: flex;
    justify-content: space-around;
    color: #9c9c9c;
  }
  .bg {
    display: inline-block;
    width: .45rem;
    height: .40rem;
    margin: .17rem 0 0;
    background: url(../../assets/mobile/mobileS.png) no-repeat;
  }
  .msg {
    font-size: .28rem;
    line-height: .75rem;
  }
  .arrow {
    display: block;
    width: .15rem;
    height: .30rem;
    background: url(../../assets/mobile/mobileS.png) -280px -55px;
    margin-top: .24rem;
  }
}
.order {
  margin-bottom: .35rem;
  .bg {
    background-position: -165px 0;
    background-size: 100% 100%;
  }
}
.design {
  .bg {
    background-position: -236px 0;
    background-size: 10% 100%;
  }
}
</style>
