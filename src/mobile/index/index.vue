<template>
<div class="mIndex">
    <div class="top">
        <div class="city">
            <span class="listO"></span>
            <span class="listI"></span>
            <p>北京市</p>
        </div>
        <div class="logo">
            <img src="../../assets/index/icon.png" alt="">
            <h1>信达</h1>
        </div>
    </div>
    <img src="../../assets/mobile/dalou.jpg" class="lunbo">
    <div class="head">
        <a href="javascript:void(0)"><span class="head1"></span><p>财税服务</p></a>
        <a href="javascript:void(0)"><span class="head2"></span><p>开公司</p></a>
        <a href="javascript:void(0)"><span class="head3"></span><p>公司变更</p></a>
        <a href="javascript:void(0)"><span class="head4"></span><p>个人社保</p></a>
    </div>
    <div class="head">
        <a href="javascript:void(0)"><span class="head5"></span><p>公司社保</p></a>
        <a href="javascript:void(0)"><span class="head6"></span><p>知识产权</p></a>
        <a href="javascript:void(0)"><span class="headAll"></span><p>全部服务</p></a>
        <a href="javascript:void(0)"><span></span></a>
    </div>
    <div class="body">
        <div class="bodyT">
            <p>知识产权</p><span></span>
        </div>
        <div>
            <img src="" alt="">
            <img src="" alt="">
            <img src="" alt="">
        </div>
        <div class="bodyT">
            <p>初创企业</p><span></span>
        </div>
        <div>
            
        </div>
    </div>
    <div class="logo">
        <img src="../../assets/index/icon.png" alt="">
        <h1>信达</h1>
    </div>
    <p class="bottom">一站式企业交易中心</p>
</div>
  
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top {
  position: relative;
  padding: 0.3rem 1rem;
  .city {
    position: absolute;
    top: 20px;
    .listO {
      display: inline-block;
      border-top: 14px solid #000000;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 14px solid transparent;
      position: absolute;
      left: 0;
      top: 8px;
    }
    .listI {
      display: inline-block;
      border-top: 12px solid #ffffff;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid transparent;
      position: absolute;
      left: 2px;
      top: 8px;
    }
    p {
      display: inline;
      margin-left: 1.9rem;
      font-size: 23px;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  h1 {
    line-height: 56px;
  }
}
.lunbo {
  width: 100%;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  span{
    display: block;
    width: 110px;
    height: 110px
  }
  p{
      font-size: 23px;
      text-align: center;
      color: #000000;
  }
  .head1 {
    background: url("../../assets/mobile/caishui.png");
  }
  .head2 {
    background: url("../../assets/mobile/kaigongsi.png");
  }
  .head3 {
    background: url("../../assets/mobile/gongsibiangeng.png");
  }
  .head4 {
    background: url("../../assets/mobile/gerenshebao.png");
  }
  .head5 {
    background: url("../../assets/mobile/gongsishebao.png");
  }
  .head6 {
    background: url("../../assets/mobile/zhishichanquan.png");
  }
  .headAll {
    background: url("../../assets/mobile/quanbufuwu.png");
  }
}
.body{
    .bodyT{
        border-bottom: 2px solid #2693d4;
        position: relative;
        p{
            font-size: 29px;
            padding: 2rem 1rem 0.5rem;
        }
        span{
            position: absolute;
            border-top: 3px solid transparent;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-bottom: 3px solid #2693d4;
            top: 73px;
            left: 71px;
        }
    }
}


.bottom{
    text-align: center;
    font-size: 22px;
    color: #aeaeae;
    padding: 18px 0 35px;
}
</style>
