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
  width: 100%;
  background: #f8f8f8;
  margin: 0 auto;
  padding: 2.79rem 0.71rem 3.77rem 0.69rem;
  box-sizing: border-box;
}
.portrait {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
}

.e9 {
  width: 100%;
  height: 0.75rem;
  background-color: #e9e9e9;
  display: flex;
  .bg {
    display: inline-block;
    width: .39rem;
    height: .39rem;
    margin: .17rem .46rem 0 .17rem;
    background: url(../../assets/mobile/mobileS.png)  50% 50%;
  }
  .msg {
    font-size: 0.26rem;
    color: #9c9c9c;
    line-height: 0.75rem;
  }
  .arrow {
    // display: block;
    // width: 15px;
    // height: 30px;
    // background: url(../../assets/mobile/mobileS.png) -280px -55px;
    // margin-left: 40%;
    // margin-top: 24px;
  }
}
.order {
  margin-bottom: 0.35rem;
  margin-top: 1.52rem;
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
  line-height: .75rem;
  width: 100%;
  height: .75rem;
  border: .01rem solid #2693d4;
  border-radius: .04rem;
  background: #2693d4;
  font-size: .28rem;
  font-weight: 600;
  line-height: .75rem;
  color: #fff;
  font-family: "宋体";
  margin-top: 1rem;
}
</style>
