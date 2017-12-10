<template>
  <div class="mobile">
    <div class="portrait"></div>
    <div class="order e9">
      <span class="bg"></span>
      <span class="msg">我的订单</span>
      <span class="arrow"></span>
    </div>
    <div class="design e9">
      <span class="bg"></span>
      <span class="msg">账户设置</span>
      <span class="arrow"></span>
    </div>
    <a href="#" class="exit">退出登录</a>
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
  padding: 21% 9% 28.5%;
  box-sizing: border-box;
}
.portrait {
  width: 165px;
  height: 165px;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
}

.e9 {
  width: 100%;
  height: 75px;
  background-color: #e9e9e9;
  display: flex;
  .bg {
    display: inline-block;
    width: 9.5%;
    height: 40px;
    margin: 17px 7.3% 0 17px;
    background: url(../assets/mobile/mobileS.png)  80% 80%;
  }
  .msg {
    font-size: 26px;
    color: #9c9c9c;
    line-height: 75px;
  }
  .arrow {
    display: block;
    width: 15px;
    height: 30px;
    background: url(../assets/mobile/mobileS.png) -280px -55px;
    margin-left: 40%;
    margin-top: 24px;
  }
}
.order {
  margin-bottom: 35px;
  margin-top: 152px;
  .bg {
    background-position: -165px 0;
  }
}
.design {
  .bg {
    background-position: -236px 0;
  }
}

.exit {
  display: block;
    text-decoration: none;
    text-align: center;
    line-height: 57px;
    width: 100%;
    height: 75px;
    border: 1px solid #2693d4;
    border-radius: 4px;
    background: #2693d4;
    font-size: 28px;
    font-weight: 600;
    line-height: 75px;
    color: #fff;
    font-family: "宋体";
    margin-top: 100px;
}
</style>
