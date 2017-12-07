<template>

  <div>
    <sele/>
    <!-- 产品列表及轮播 -->
    <div class="pro-nav">
      <!-- 轮播 -->
      <div class="block">
        <span class="demonstrantion"></span>
        <el-carousel trigger="click" height="400px" initial-index=0>
          <el-carousel-item v-for="item in 4" :key="item">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--菜单 -->
      <div class="ItemList">
        <div class="Listleft">
          <div class="ListImg">
            <div class="ImgI"></div>
            <div class="ImgII"></div>
            <div class="ImgIII"></div>
            <div class="ImgIV"></div>
          </div>
          <div class="Listnames">
            <div class="listI" v-for="itemName in ItemLists" :key="itemName.name">
              <p class="ListNameI">
                <a href="javascript:void(0)">{{itemName.name}}</a>
              </p>
              <div class="listII" v-for="itemNameII in itemName.itemList" :key="itemNameII.name">
                <p>
                  <a href="javascript:void(0)">{{itemNameII.name}}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="Listright">
          <div v-for="itemName in ItemLists" :key="itemName.name" class="listIII">
            <div v-for="itemNameII in itemName.itemList" :key="itemNameII.name" class="listIII-s">
              <div class="ListNameII">
                <p>{{itemNameII.name}}></p>
              </div>
              <div class="ListNameIII">
                <div v-for="itemNameIII in itemNameII.itemList" :key="itemNameIII.name">
                  <p>
                    <a href="javascript:void(0)">{{itemNameIII.name}}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 明星产品推荐 -->
    <div class="starsShow">
      <div class="topFrame">
        <h3>明星产品推荐</h3>
      </div>
      <div class="starContent">
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" src="../../assets/HomePageimages/i1.jpg">
            <h4>标准五险一金</h4>
            <p>定制化社保代理，定制化代缴服务</p>
            <span>20
              <p>元/人/月</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" src="../../assets/HomePageimages/i2.jpg">
            <h4>内资有限公司注册</h4>
            <p>一键完成注册，快速开办公司</p>
            <span>600
              <p>元/次</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" src="../../assets/HomePageimages/i3.jpg">
            <h4>小规模代理记账/年</h4>
            <p>专业会计报税，高效、便捷、贴心</p>
            <span>3000
              <p>元/年</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" src="../../assets/HomePageimages/i3.jpg">
            <h4>国内普通商标注册</h4>
            <p>次日提交商标申请，最快保护品牌价值</p>
            <span>1000
              <p>元/次</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 初创企业必备 -->
    <div class="newCompany">
      <div class="topFrame">
        <h3>初创企业必备</h3>
      </div>
      <div class="com-inf">
        <div class="infBox" v-for="product in products" :key="product">
          <div class="pro-logo"><img :src="'http://115.182.107.203:8088/xinda/pic'+product.providerImg" alt=""></div>
          <h4>{{product.providerName}}</h4>
          <p class="service">{{product.serviceName}}</p>
          <p class="service-inf">{{product.serviceInfo}}</p>
          <span class="price">￥{{product.marketPrice}}</span>
          <span class="unit">{{product.unit}}</span>
          <button>查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sele from "@/components/sele";
export default {
  components: { sele },
  created() {
    var that = this;
    this.ajax.post("/xinda-api/product/style/list").then(function(data) {
      var rData = data.data.data;
      that.ItemLists = rData;
      console.log(that.ItemLists);
    });
    this.ajax.post("/xinda-api/recommend/list").then(function(data) {
      var tData = data.data.data.hq;
      console.log(tData);
      that.products = tData;
      console.log(that.products[0].providerName);
    });
  },
  data() {
    return {
      ItemLists: [],
      products: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.pro-nav {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  position: relative;
}
.el-carousel {
  width: 1200px;
  height: 400px;
  .el-carousel__item:nth-child(1) {
    border: 5px solid #000;
  }
  .el-carousel__item:nth-child(3) {
    background: url(../../assets/HomePageimages/lun1.jpg) no-repeat;
  }
  .el-carousel__item:nth-child(4) {
    background: url(../../assets/HomePageimages/lun2.jpg) no-repeat;
  }
  .el-carousel__item:nth-child(5) {
    background: url(../../assets/HomePageimages/lun3.jpg) no-repeat;
  }
  .el-carousel__item:nth-child(6) {
    background: url(../../assets/HomePageimages/lun4.jpg) no-repeat;
  }
}
.ItemList {
  width: 1200px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
}
.Listleft {
  width: 200px;
  height: 400px;
  background-color: #132336;
  position: relative;
}
.ListImg {
  width: 30px;
  height: 360px;
  margin-top: 20px;
  .ImgI {
    width: 30px;
    height: 35px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -73px;
  }
  .ImgII {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -167px;
  }
  .ImgIII {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -119px;
  }
  .ImgIV {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -230px;
  }
}
.Listnames {
  width: 160px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 40px;
}
.listI {
  width: 160px;
  height: 80px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  .ListNameI {
    width: 160px;
    height: 20px;
    line-height: 20px;
    a {
      font-size: 16px;
      color: #fff;
      text-decoration: none;
    }
  }
  .listII {
    p {
      margin-right: 20px;
      a {
        text-decoration: none;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
.Listright {
  width: 1000px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  .listIII {
    width: 1000px;
    height: 108px;
    margin-top: 7px;
    background-color: rgba(160, 190, 200, 0.5);
    .listIII-s {
      width: 1000px;
      margin-bottom: 15px;
      display: flex;
    }
    .ListNameII {
      height: 20px;
      p {
        height: 14px;
        font-size: 14px;
        color: #fff;
        line-height: 14px;
        margin: 2px auto;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    .ListNameIII {
      width: 900px;
      height: 20px;
      display: flex;
      flex-wrap: wrap;
      p {
        height: 14px;
        border-left: 1px solid #fff;
        line-height: 14px;
        margin: 2px auto;
        a {
          text-decoration: none;
          font-size: 14px;
          color: #fff;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
.topFrame {
  width: 1200px;
  height: 35px;
  border-bottom: 2px solid #2693d4;
  h3 {
    margin-left: 20px;
  }
}
.starsShow {
  width: 1200px;
  margin: 40px auto;
  .starContent {
    width: 1200px;
    height: 400px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    .boxFrame {
      width: 270px;
      height: 400px;
      border: 1px solid #ddd;
      .showBox {
        width: 256px;
        height: 386px;
        background-color: #fafafa;
        margin: 7px;
        .boxImg {
          width: 125px;
          height: 125px;
          margin-left: 65px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
        h4 {
          text-align: center;
          margin-bottom: 30px;
        }
        p {
          font-size: 14px;
          text-align: center;
          color: #3f3f3f;
        }
        span {
          font-size: 28px;
          color: #2693d4;
          margin-left: 75px;
          margin-top: 30px;
          display: inline-block;
          p {
            font-size: 14px;
            text-align: center;
            color: #3f3f3f;
            display: inline-block;
          }
        }
      }
    }
  }
}
.newCompany {
  width: 1200px;
  margin: 40px auto;
  .com-inf {
    width: 1200px;
    height: 400px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
  }
  .infBox {
    width: 270px;
    height: 400px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    .pro-logo {
      width: 125px;
      height: 125px;
      margin-top: 30px;
      margin-left: 65px;
      margin-bottom: 30px;
      background-color: #fff;
      border-radius: 50%;
      overflow: hidden;
      img {
        margin: 40px 29px;
      }
    }
    h4 {
      text-align: center;
      margin-bottom: 10px;
    }
    .service {
      font-size: 15px;
      text-align: center;
      color: #000;
      margin-bottom: 10px;
    }
    .service-inf {
      width: 250px;
      font-size: 14px;
      margin: 0px auto;
      text-align: left;
      color: #3f3f3f;
    }
    .price {
      font-size: 20px;
      color: #2693d4;
      margin-left: 75px;
      margin-top: 10px;
      display: inline-block;
    }
    button {
      display: block;
      width: 100px;
      height: 30px;
      margin: 10px auto;
      line-height: 30px;
      text-align: center;
      color: #2693d4;
      border: 1px solid #2693d4;
      border-radius: 2px;
      background-color: #fff;
    }
  }
}
.infBox:nth-child(1) {
  img {
    width: 146px;
    margin: 40px auto !important;
    margin-left: -10px !important;
  }
}
.infBox:nth-child(4) {
  .service {
    margin-bottom: 0px;
  }
  .price {
    margin-top: 0px;
  }
}
</style>