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
  max-width: 768px;
  width: 100%;
  height: 1334px;
  background: #f8f8f8;
  margin: 0 auto;
  padding: 35% 9%;
  box-sizing: border-box;
}
.portrait {
  width: 165px;
  height: 165px;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
}
.buttonSum {
  margin: 26px 0 163px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    text-align: center;
    line-height: 57px;
    width: 154px;
    height: 57px;
    border: 1px solid #04d9ae;
    border-radius: 4px;
    background: #04d9ae;
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    font-family: "宋体";
  }
}
.e9 {
  width: 100%;
  height: 75px;
  background-color: #e9e9e9;
  padding-right: 40px;
  box-sizing: border-box;
  a {
    display: flex;
    justify-content: space-around;
    color: #9c9c9c;
  }
  .bg {
    display: inline-block;
    width: 45px;
    height: 40px;
    margin: 17px 0 0;
    background-image: url(../../assets/mobile/mobileS.png);
  }
  .msg {
    font-size: 28px;
    line-height: 75px;
  }
  .arrow {
    display: block;
    width: 15px;
    height: 30px;
    background: url(../../assets/mobile/mobileS.png) -280px -55px;
    margin-top: 24px;
  }
}
.order {
  margin-bottom: 35px;
  .bg {
    background-position: -165px 0;
  }
}
.design {
  .bg {
    background-position: -236px 0;
  }
}
</style>
