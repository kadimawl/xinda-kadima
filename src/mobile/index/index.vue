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
            <h3>信达</h3>
        </div>
    </div>
    <img src="../../assets/mobile/index/dalou.jpg" class="lunbo">
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
        <div class="bodyI">
            <div>
              <img src="../../assets/mobile/index/shangbiao.png" alt="">
              <img src="../../assets/mobile/index/banquan.png" alt="">
            </div>
            <img src="../../assets/mobile/index/zhuzuo.png" alt="">
        </div>
        <div class="bodyT">
            <p>初创企业</p><span></span>
        </div>
        <div>
            <div v-for="data in datas" :key="data.id" class="qiye">
              <div class="qiyeI">
                <img :src="'http://115.182.107.203:8088/xinda/pic'+data.providerImg" alt="">
              </div>
              <div class="qiyeS">
                <h3>{{data.serviceName}}</h3>
                <p>{{data.serviceInfo}}</p>
                <span>￥{{data.marketPrice}}<p>{{data.unit}}</p></span>
              </div>
            </div>
        </div>
    </div>
    <div class="logo">
        <img src="../../assets/index/icon.png" alt="">
        <h3>信达</h3>
    </div>
    <p class="bottom">一站式企业交易中心</p>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      datas: []
    };
  },
  created() {
    var that = this;
    this.ajax
      .post("http://115.182.107.203:8088/xinda/xinda-api/recommend/list")
      .then(function(data) {
        console.log(data.data.data);
        that.datas = data.data.data.hq;
      });
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
    top: 0.4rem;
    .listO {
      display: inline-block;
      border-top: 0.6rem solid #000000;
      border-left: 0.6rem solid transparent;
      border-right: 0.6rem solid transparent;
      border-bottom: 0.6rem solid transparent;
      position: absolute;
      left: 0;
      top: 1.2rem;
    }
    .listI {
      display: inline-block;
      border-top: 0.5rem solid #ffffff;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      position: absolute;
      left: 0.1rem;
      top: 1.2rem;
    }
    p {
      display: inline;
      margin-left: 1.3rem;
      font-size: 1rem;
      line-height: 3rem;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    padding: 0.5rem 0.3rem;
  }
  h3 {
    line-height: 3rem;
    font-size: 1.3rem;
    padding-right: 1rem;
  }
}
.lunbo {
  width: 100%;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  span {
    display: block;
    width: 4rem;
    height: 4rem;
  }
  p {
    font-size: 1rem;
    text-align: center;
    color: #000000;
  }
  // #img.source-image {width: 100%;position: absolute;top: 0;left: 0;}
  .head1 {
    background: url("../../assets/mobile/index/caishui.png");
    background-size: 100% 100%;
  }
  .head2 {
    background: url("../../assets/mobile/index/kaigongsi.png");
    background-size: 100% 100%;
  }
  .head3 {
    background: url("../../assets/mobile/index/gongsibiangeng.png");
    background-size: 100% 100%;
  }
  .head4 {
    background: url("../../assets/mobile/index/gerenshebao.png");
    background-size: 100% 100%;
  }
  .head5 {
    background: url("../../assets/mobile/index/gongsishebao.png");
    background-size: 100% 100%;
  }
  .head6 {
    background: url("../../assets/mobile/index/zhishichanquan.png");
    background-size: 100% 100%;
  }
  .headAll {
    background: url("../../assets//mobile/index/quanbufuwu.png");
    background-size: 100% 100%;
  }
}
.body {
  .bodyT {
    border-bottom: 2px solid #2693d4;
    position: relative;
    p {
      font-size: 1.2rem;
      padding: 2rem 1rem 0.5rem;
    }
    span {
      position: absolute;
      border-top: 0.2rem solid transparent;
      border-left: 0.2rem solid transparent;
      border-right: 0.2rem solid transparent;
      border-bottom: 0.2rem solid #2693d4;
      top: 3.66rem;
      left: 3.2rem;
    }
  }
  .bodyI {
    padding: 2rem 1rem 0;
    & > img {
      width: 100%;
    }
    div {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.6rem;
      img {
        width: 48%;
        height: 48%;
      }
    }
  }
}
.qiye {
  display: flex;
  padding: 1.2rem 0.8rem;
  .qiyeI {
    width: 10rem;
    border: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .qiyeS {
    width: 30rem;
    margin-left: 1rem;
    h3 {
      font-size: 1.1rem;
      font-weight: 400;
      margin: 0.3rem 0;
    }
    & > p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    span {
      display: block;
      font-size: 1.1rem;
      color: #ff1514;
      font-weight: bold;
      margin: 0.3rem 0 0;
      p{
        font-size: 0.5rem;
        color: #676767;
        display: inline;
        margin-left: 0.2rem;
      }
    }
  }
}

.bottom {
  text-align: center;
  font-size: 1rem;
  color: #aeaeae;
  padding: 18px 0 35px;
}
</style>
