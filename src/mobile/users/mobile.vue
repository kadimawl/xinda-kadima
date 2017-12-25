<template>
  <div class="mobile">
    <div class="portrait"><img src="../../assets/mobile/btmmine.png" alt=""></div>
    <div class="buttonSum">
      <a href="/#/m/users/mobileRegister">注册</a>
      <a href="/#/m/users/mobileLogin">登录</a>
    </div>
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
  padding: 2.8rem 0.71rem 4.57rem 0.66rem;
  box-sizing: border-box;
}
.portrait {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
  img{
    width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  }
}
.buttonSum {
  margin: 0.26rem auto 1.63rem;
  width: 3.5rem;
  display: flex;
  justify-content: space-between;
  a {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 0.59rem;
    width: 1.53rem;
    height: 0.59rem;
    border-radius: 4px;
    background: #2693d4;
    font-size: 0.28rem;
    font-weight: 600;
    color: #fff;
    font-family: "宋体";
  }
}
.e9 {
  width: 100%;
  height: 0.75rem;
  background-color: #e9e9e9;
  padding-right: 0.4rem;
  box-sizing: border-box;
  margin-bottom: .35rem;
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
</style>
