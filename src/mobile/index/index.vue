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

    <div class="block">
      <span class="demonstrantion"></span>
      <el-carousel trigger="click" height="2.5rem" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- <img src="../../assets/mobile/index/dalou.jpg" class="lunbo"> -->
    <div class="head">
        <router-link :to="{ path: '/m/mIndexList'}"><span class="head1"></span><p>财税服务</p></router-link>
        <a href="javascript:void(0)" @click="gotoPro(4)"><span class="head2"></span><p>开公司</p></a>
        <a href="javascript:void(0)" @click="gotoPro(5)"><span class="head3"></span><p>公司变更</p></a>
        <a href="javascript:void(0)" @click="gotoPro(7)"><span class="head4"></span><p>个人社保</p></a>
    </div>
    <div class="head">
        <a href="javascript:void(0)" @click="gotoPro(6)"><span class="head5"></span><p>公司社保</p></a>
        <router-link :to="{ path: '/m/mIndexList'}"><span class="head6"></span><p>知识产权</p></router-link>
        <router-link :to="{ path: '/m/mIndexList'}"><span class="headAll"></span><p>全部服务</p></router-link>
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
            <div v-for="data in datas" :key="data.id" class="qiye" @click="gotoShop(data.id)">
              <div class="qiyeI">
                <img :src="'http://115.182.107.203:8088/xinda/pic'+data.providerImg" alt="">
              </div>
              <div class="qiyeS">
                <div>
                  <h3>{{data.serviceName}}</h3>
                  <p>{{data.serviceInfo}}</p>
                </div>
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
    <mobileBottom/>
</div>
  
</template>

<script>
import mobileBottom from "../mobileBottom";
export default {
  components: { mobileBottom },
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
        that.datas = data.data.data.hq;
      });
  },
  methods: {
    gotoPro(code) {
      this.$router.push({
        path: "/m/mProduct",
        query: { productTypeCode: code }
      });
    },
    gotoShop(id) {
      console.log(id);
      this.$router.push({
        path: "/m/shop/shopDetail",
        query: { sId: id }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.el-carousel {
  width: 100%;
  height: 2.5rem;
  overflow: hidden;
  .el-carousel__item:nth-child(1) {
    border: 5px solid #000;
  }
  .el-carousel__item:nth-child(3) {
    background: url(../../assets/HomePageimages/lun1.jpg);
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(4) {
    background: url(../../assets/HomePageimages/lun2.jpg);
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(5) {
    background: url(../../assets/HomePageimages/lun3.jpg);
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(6) {
    background: url(../../assets/HomePageimages/lun4.jpg);
    background-size: 100% 100%;
  }
}

.top {
  position: relative;
  padding: 0.1rem 0.2rem;
  .city {
    position: absolute;
    display: flex;
    top: 0.25rem;
    .listO {
      border-top: 0.12rem solid #000000;
      border-left: 0.12rem solid transparent;
      border-right: 0.12rem solid transparent;
      border-bottom: 0.12rem solid transparent;
      position: absolute;
      left: 0;
      top: 0.1rem;
    }
    .listI {
      border-top: 0.1rem solid #ffffff;
      border-left: 0.1rem solid transparent;
      border-right: 0.1rem solid transparent;
      border-bottom: 0.1rem solid transparent;
      position: absolute;
      left: 0.02rem;
      top: 0.1rem;
    }
    p {
      margin-left: 0.3rem;
      font-size: 0.23rem;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  img {
    width: 0.55rem;
    height: 0.55rem;
  }
  h3 {
    line-height: 0.55rem;
    font-size: 0.28rem;
    padding: 0 0.15rem;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.3rem 0;
  // margin-top: 0.5erm;  
  span {
    display: block;
    width: 1.1rem;
    height: 1.1rem;
  }
  p {
    font-size: 0.23rem;
    line-height: 0.45rem;
    margin-bottom: 0.15rem;
    text-align: center;
    color: #000000;
  }
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
      font-size: 0.28rem;
      padding: 0.32rem 0.23rem 0.11rem;
    }
    span {
      position: absolute;
      border-top: 0.04rem solid transparent;
      border-left: 0.04rem solid transparent;
      border-right: 0.04rem solid transparent;
      border-bottom: 0.04rem solid #2693d4;
      top: 0.73rem;
      left: 0.76rem;
    }
  }
  .bodyI {
    padding: 0.45rem 0.17rem 0;
    & > img {
      width: 100%;
    }
    div {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.17rem;
      img {
        width: 48%;
        height: 48%;
      }
    }
  }
}
.qiye {
  display: flex;
  align-items: center;
  padding: 0.27rem 0.17rem;
  .qiyeI {
    width: 1.68rem;
    height: 1.68rem;
    border: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .qiyeS {
    width: 4.85rem;
    margin-left: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 0.28rem;
      font-weight: 400;
      margin: 0 0 0.1rem 0;
    }
    div p {
      font-size: 0.23rem;
      line-height: 0.4rem;
      text-align: left;
    }
    span {
      display: block;
      font-size: 0.26rem;
      color: #ff1514;
      font-weight: bold;
      margin: 0.1rem 0 0;
      p {
        font-size: 0.15rem;
        color: #676767;
        display: inline;
        margin-left: 0.15rem;
      }
    }
  }
}

.bottom {
  text-align: center;
  font-size: 0.22rem;
  color: #aeaeae;
  padding: 0.18rem 0 0.35rem;
  margin-bottom: 0.9rem;
}
</style>
