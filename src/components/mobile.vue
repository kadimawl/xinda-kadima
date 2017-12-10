<template>
  <div class="mobile">
      <div class="portrait"></div>
      <div class="buttonSum"><button>注册</button><button>登录</button></div>  
      <div class="order e9"><span class="bg"></span><span class="msg">我的订单</span><span class="arrow"></span></div>
      <div class="design e9"><span class="bg"></span><span class="msg">账户设置</span><span class="arrow"></span></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.mobile {
  max-width: 768px;
  width: 100%;
  height: 1334px;
  background: #f8f8f8;
  margin: 0 auto;
  padding: 30% 9%;
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
  margin: 26px 23% 163px;
  width: 52%;
  display: flex;
  // justify-content: space-between;
  button {
      width: 154px;
      height: 57px;
      border: none;
      border: 1px solid #2693d4;
      border-radius: 4px;
      background: #2693d4;
      outline: 0;
      font-size: 28px;
      font-weight: 600;
      color: #fff;
      font-family: '宋体';
      &:first-child{
        margin-right: 35px;
      }
  }
}
.e9{
  width: 100%;
  height: 75px;
  background-color: #e9e9e9;
  display: flex;
  padding-right: 40px;
  box-sizing: border-box;
  .bg{
    display: inline-block;
    width: 45px;
    height: 40px;
    margin: 17px 46px 0 17px;
    background-image: url(../assets/mobile/mobileS.png)
  }
  .msg{
    font-size: 28px;
    color: #9c9c9c;
    line-height: 75px;
  }
  .arrow{
    display: inline-block;
    width: 15px;
    height: 30px;
    background: url(../assets/mobile/mobileS.png) -280px -55px;
    margin-top: 24px;
    
  }
}
.order{
  margin-bottom: 35px;
  .bg{
    background-position: -165px 0;
  }
}
.design{
  .bg{
    background-position: -236px 0;
  }
}
</style>
