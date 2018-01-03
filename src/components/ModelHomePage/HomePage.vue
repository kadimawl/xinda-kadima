<template>
  <div>
    <sele @display='displayShow'></sele>
    <!-- 产品列表及轮播 -->
    <div class="pro-nav">
      <!-- 轮播 -->
      <div class="block">
        <span class="demonstrantion"></span>
        <el-carousel trigger="click" height="405px">
          <el-carousel-item v-for="item in 4" :key="item.id">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--菜单 -->
      <div class="ItemList" @mouseleave="mleave">
        <div class="Listleft" v-show="SorH">
          <div class="ListImg">
            <div class="ImgI"></div>
            <div class="ImgII"></div>
            <div class="ImgIII"></div>
            <div class="ImgIV"></div>
          </div>
          <div class="Listnames">
            <div class="listI" v-for="(itemName,idx) in ItemLists" :key="itemName.name" @mouseover="mover(idx)">
              <p class="ListNameI">
                <a href="javascript:void(0);" :code="itemName.code" @click="toListI(itemName.code)">{{itemName.name}}</a>
              </p>
              <div class="listII" v-for="itemNameII in itemName.itemList" :key="itemNameII.name">
                <p>
                  <a href="javascript:void(0);" :code="itemNameII.code" @click="toListII(itemNameII.code)">{{itemNameII.name}}</a>
                </p>
              </div>
              <!-- 三级菜单条目显示判断“v-show="idx==index"” -->
              <div class="listIII" v-show="idx==index">
                <div class="listIII-s" v-for="itemNameII in itemName.itemList" :key="itemNameII.name">
                  <div class="ListNameII">
                    <p :code="itemNameII.code" @click="toListII(itemNameII.code)">{{itemNameII.name}}></p>
                  </div>
                  <div class="ListNameIII" :code="itemNameII.code" @click="toListII(itemNameII.code)">
                    <div v-for="itemNameIII in itemNameII.itemList" :key="itemNameIII.name">
                      <p>
                        <a href="javascript:void(0);">{{itemNameIII.name}}</a>
                      </p>
                    </div>
                  </div>
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
      <div class="starContent" @click="starclick">
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" :src="require('../../assets/HomePageimages/i1.jpg')">
            <h4>标准五险一金</h4>
            <p>定制化社保代理，定制化代缴服务</p>
            <span>20
              <p>元/人/月</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" :src="require('../../assets/HomePageimages/i2.jpg')">
            <!-- <img class="boxImg" :src="reg"> -->
            <h4>内资有限公司注册</h4>
            <p>一键完成注册，快速开办公司</p>
            <span>600
              <p>元/次</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" :src="require('../../assets/HomePageimages/i3.jpg')">
            <h4>小规模代理记账/年</h4>
            <p>专业会计报税，高效、便捷、贴心</p>
            <span>3000
              <p>元/年</p>
            </span>
          </div>
        </div>
        <div class="boxFrame">
          <div class="showBox">
            <img class="boxImg" :src="require('../../assets/HomePageimages/i2.jpg')">
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
        <div class="infBox" v-for="product in products" :key="product.id">
          <div class="pro-logo"><img :src="tUrl+product.providerImg" alt=""></div>
          <h4>{{product.providerName}}</h4>
          <p class="service">{{product.serviceName}}</p>
          <p class="service-inf">{{product.serviceInfo}}</p>
          <span class="price">￥{{product.price}}</span>
          <span class="unit">{{product.unit}}</span>
          <button @click="toDetail(product.id)">查看详情</button>
        </div>
      </div>
    </div>
    <!-- 知识产权 -->
    <div class="iProperty">
      <div class="topFrame">
        <h3>知识产权</h3>
      </div>
      <div class="IP-AD">
        <div class="ad-Pic">
          <div class="picLeft"></div>
          <div class="picRight">
            <div class="rightTop">
              <div class="topI"></div>
              <div class="topII"></div>
            </div>
            <div class="rightBottom"></div>
          </div>
        </div>
        <div class="ad-special"></div>
      </div>
    </div>
    <!-- 推荐服务 -->
    <div class="recommend">
      <div class="topFrame">
        <span @click="shorhi2" :class="[!SorH?'active':'default000']">推荐服务商</span>
        <span @click="shorhi" :class="[SorH?'active':'default000']">推荐服务</span>
      </div>
      <div class="providers" v-show="!SorH">
        <div class="provider" v-for="Providers in providers" :key="Providers.id" @click="toStore(Providers.id)">
          <div class="pro-logo"><img :src="tUrl+Providers.providerImg" alt=""></div>
          <h4>{{Providers.providerName}}</h4>
          <p>服务指数：8.9分</p>
          <p>提供的服务：</p>
          <div class="service-infs">
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
          </div>
          <!-- 推荐服务商 -->
        </div>
        <div class="provider" v-for="Providers in providers" :key="Providers.id" @click="toStore(Providers.id)">
          <div class="pro-logo"><img :src="tUrl+Providers.providerImg" alt=""></div>
          <h4>{{Providers.providerName}}</h4>
          <p>服务指数：8.9分</p>
          <p>提供的服务：</p>
          <div class="service-infs">
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
            <div class="service-inf">{{Providers.products}}</div>
          </div>
        </div>
      </div>
      <div class="com-inf" v-show="SorH">
        <div class="services" v-for="Service in services" :key="Service.id">
          <div class="pro-logo"><img :src="tUrl+Service.providerImg" alt=""></div>
          <h4>{{Service.providerName}}</h4>
          <p class="service">{{Service.serviceName}}</p>
          <p class="service-inf">{{Service.serviceInfo}}</p>
          <span class="price">￥{{Service.price}}</span>
          <span class="unit">{{Service.unit}}</span>
          <button @click="toDetail(Service.id)">查看详情</button>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partners">
      <div class="topFrame">
        <h3>合作伙伴</h3>
      </div>
      <div class="partnerImg"></div>
    </div>
  </div>
</template>

<script>
import sele from "@/components/sele"; //头部部分引用
export default {
  components: { sele },
  created() {
    var that = this;
    this.dataRequest1();
    this.dataRequest2();
  },
  data() {
    return {
      SorH: false,
      ItemLists: [],
      products: [],
      providers: [],
      services: [],
      index: -1,
    };
  },
  methods: {
    // 明星产品推荐的点击事件
    starclick(){
        this.$router.push('/tabs/companyList');
    },
    dataRequest1: function() {
      //三级菜单
      var that = this;
      this.ajax.post("/xinda-api/product/style/list").then(function(data) {
        var datas = data.data.data;

        for (var i in datas) {
          //对象排序
          sort(datas[i].itemList);
          for (var j in datas) {
            if (i != j && datas[i].code < datas[j].code) {
              var sor = datas[i];
              datas[i] = datas[j];
              datas[j] = sor;
            }
          }
        }
        function sort(bat) {
          for (var ii in bat) {
            for (var jj in bat) {
              if (ii != jj && bat[ii].code < bat[jj].code) {
                var ros = bat[ii];
                bat[ii] = bat[jj];
                bat[jj] = ros;
              }
            }
          }
        }
        that.ItemLists = datas;
        console.log(that.ItemLists);
      });
    },
    dataRequest2: function() {
      //各类产品服务
      var that = this;
      this.ajax.post("/xinda-api/recommend/list").then(function(data) {
        var tData = data.data.data.hq; //
        var gData = data.data.data.provider;
        var lData = data.data.data.product;
        console.log(data.data.data.hq);
        that.products = tData;
        that.providers = gData;
        that.services = lData;
      });
    },
    displayShow: function() {
      //全部产品菜单显示
      this.SorH = true;
    },
    mover: function(idx) {
      //鼠标上浮时获取选中对象index值，并使二三级菜单显示与之index值匹配的条目
      this.index = idx;
    },
    mleave: function() {
      //离开菜单区域菜单隐藏
      this.SorH = false;
    },
    toListI: function(code) {
      //一级菜单跳转
      var that = this;
      this.ajax.post("/xinda-api/product/style/list").then(function(data) {
        var rData = data.data.data;
        if (code == 1) {
          that.$router.push({
            path: "/tabs/taxationList", //财税服务
            query: { code: code }
          });
        } else if (code == 2) {
          that.$router.push({
            path: "/tabs/companyList", //公司工商
            query: { code: code }
          });
        }else if(code == 3) {
          that.$router.push({
            path:"/tabs/wisdomList", //知识产权
            query:{code: code}
          });
        }else if(code == 4) {
          that.$router.push({
            path:"/tabs/securityList", //社保代理
            query:{code: code}
          });
        }
      });
    },
    toListII: function(code) {
      //二三级菜单跳转
      var that = this;
      this.ajax.post("/xinda-api/product/style/list").then(function(data) {
        var rData = data.data.data;
        if (code == 1) {
          that.$router.push({
            path: "/tabs/taxationList",
            query: { code: code }
          });
        } else if (code == 2) {
          that.$router.push({
            path: "/tabs/taxationList",
            query: { code: code }
          });
        } else if (code == 3) {
          that.$router.push({
            path: "/tabs/taxationList",
            query: { code: code }
          });
        } else if (code == 4) {
          that.$router.push({
            path: "/tabs/companyList",
            query: { code: code }
          });
        } else if (code == 5) {
          that.$router.push({
            path: "/tabs/companyList",
            query: { code: code }
          });
        }else if (code == 6) {
          that.$router.push({
            path: "/tabs/securityList",
            query: { code: code }
          });
        }else if (code == 7) {
          that.$router.push({
            path: "/tabs/securityList",
            query: { code: code }
          });
        }else if (code == 8) {
          that.$router.push({
            path: "/tabs/wisdomList",
            query: { code: code }
          });
        }else if (code == 9) {
          that.$router.push({
            path: "/tabs/wisdomList",
            query: { code: code }
          });
        }else if (code == 10) {
          that.$router.push({
            path: "/tabs/wisdomList",
            query: { code: code }
          });
        }
      });
    },
    shorhi() {
      // console.log("切换");
      this.SorH = true;
    },
    shorhi2() {
      // console.log("切换");
      this.SorH = false;
    },
    toDetail(id) {
      //跳转产品详情
      this.$router.push({
        path: "/detial",
        query: { shoppingId: id }
      });
    },
    toStore(id) {
      // console.log("111");
      // 跳转店铺详情
      this.$router.push({
        path: "/shopList",
        query: { id: id }
      });
    }
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
  height: 405px;
  margin: 0 auto;
  position: relative;
}
.el-carousel {
  // width: 1200px;
  // height: 405px;
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
  height: 405px;
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

.listIII {
  width: 1000px;
  position: absolute;
  left: 160px;
  background-color: rgba(160, 190, 200, 0.5);
  .listIII-s {
    width: 1000px;
    margin: 15px;
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
.topFrame {
  width: 1200px;
  height: 35px;
  border-bottom: 2px solid #2693d4;
  display: flex;
  h3 {
    margin-left: 20px;
    cursor: pointer;
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
    cursor: pointer;
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
.infBox:nth-child(3) {
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
.iProperty {
  width: 1200px;
  height: 750px;
  margin: 0 auto;
  .IP-AD {
    width: 1200px;
    height: 680px;
    margin-top: 35px;
    .ad-Pic {
      width: 1200px;
      height: 480px;
      display: flex;
      justify-content: space-between;
      .picLeft {
        width: 325px;
        height: 480px;
        background: url(../../assets/HomePageimages/i4.jpg);
      }
      .picRight {
        width: 850px;
        height: 480px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rightTop {
          width: 850px;
          height: 230px;
          display: flex;
          justify-content: space-between;
          .topI {
            width: 413px;
            height: 230px;
            background: url(../../assets/HomePageimages/i5.jpg);
          }
          .topII {
            width: 413px;
            height: 230px;
            background: url(../../assets/HomePageimages/i6.png);
          }
        }
        .rightBottom {
          width: 850px;
          height: 230px;
          background: url(../../assets/HomePageimages/i7.jpg) no-repeat;
        }
      }
    }
    .ad-special {
      width: 1200px;
      height: 154px;
      margin-top: 45px;
      background: url(../../assets/HomePageimages/i9_03.png);
    }
  }
}
.recommend {
  width: 1200px;
  margin: 40px auto;
  .topFrame {
    width: 1200px;
    height: 35px;
    border-bottom: 2px solid #2693d4;
    display: flex;
    h3 {
      color: #2693d4;
      margin-left: 20px;
      cursor: pointer;
    }
    span {
      display: inline-block;
      font-size: 18px;
      margin: 0 25px 0 10px;
      cursor: pointer;
    }
  }
  .providers {
    width: 1200px;
    height: 400px;
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    .provider {
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
      p {
        font-size: 14px;
        margin-left: 20px;
      }
      .service-infs {
        width: 160px;
        height: 75px;
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .service-inf {
          width: 75px;
          height: 25px;
          background-color: #ffecb7;
          border-radius: 3px;
          overflow: hidden;
          text-align: center;
        }
      }
    }
  }
  .com-inf {
    width: 1200px;
    height: 400px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
  }
  .services {
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
.provider:nth-child(1) {
  img {
    width: 146px;
    margin: 40px auto !important;
    margin-left: -10px !important;
  }
}
.provider:nth-child(3) {
  img {
    width: 146px;
    margin: 40px auto !important;
    margin-left: -10px !important;
  }
}
.services:nth-child(1) {
  img {
    width: 146px;
    margin: 40px auto !important;
    margin-left: -10px !important;
  }
}
.services:nth-child(4) {
  .service {
    margin-bottom: 0px;
  }
  .price {
    margin-top: 0px;
  }
}
.partners {
  width: 1200px;
  margin: 30px auto;
  .topFrame {
    width: 1200px;
    height: 35px;
    border-bottom: 2px solid #2693d4;
    display: flex;
    h3 {
      color: #2693d4;
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .partnerImg {
    width: 1200px;
    height: 147px;
    margin-top: 35px;
    background: url(../../assets/HomePageimages/i10_03.png);
  }
}

.default000 {
  color: #000;
}
.active {
  color: #2693d4;
}
</style>