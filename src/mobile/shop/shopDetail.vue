<template>
    <div>
        <div class="shopD" v-for="product in products" :key="product.code">
            <div class="deTails">
                <div class="picture">
                    <img :src="'http://115.182.107.203:8088/xinda/pic'+product.img" alt="">
                </div>
                <div class="infor" v-for="pvdpdt in pvdpdts" :key="pvdpdt.code">
                    <b>{{pvdpdt.serviceName}}</b>
                    <p>{{pvdpdt.serviceInfo}}</p>
                </div>
                <p class="area" v-for="region in regions" :key="region">区域：{{region}}</p>
                <p class="price" v-for="pvdpdt in pvdpdts" :key="pvdpdt.code">价格：
                    <b>￥{{pvdpdt.price}}</b>
                    <del v-for="product in products" :key="product.code">￥{{product.marketPrice}}</del>
                </p>
            </div>
            <div class="service-Co">
                <div class="title">服务商家</div>
                <div class="Co-inf">
                    <div class="inf-content" v-for="provider in providers" :key="provider.id">
                        <div class="inf-pic">
                            <img :src="'http://115.182.107.203:8088/xinda/pic'+provider.providerImg" alt="">
                        </div>
                        <div class="inf-text" v-for="provider in providers" :key="provider.id">
                            <p>{{provider.name}}</p>
                            <p>信誉:
                                <span></span>
                            </p>
                            <p v-for="region in regions" :key="region">区域：{{region}}</p>
                            <p v-for="proBu in proBus" :key="proBu.id">累计服务客户数量：{{proBu.serviceNum}}</p>
                            <div>进入店铺</div>
                        </div>
                    </div>
                    <div class="inf-icon">
                        <div class="icon"></div>
                        <p>金牌服务商</p>
                    </div>
                </div>
            </div>
            <div class="service-Content">
                <div class="title">服务介绍</div>
                <div class="content-inf" v-html="serInf"></div>
            </div>
        </div>
        <div class="evaluate">
            <div class="title">用户评价</div>
            <div class="evaDetail">
                <div class="userPic"></div>
                <div class="userEva">
                    <p>满意度：
                        <span></span>
                    </p>
                    <p>评价：服务热情周到！</p>
                </div>
            </div>
        </div>
        <div class="buttons">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
  created() {
    var that = this;
    this.ajax
      .post(
        "/xinda-api/product/package/detail",
        this.qs.stringify({
          sId: "0cb85ec6b63b41fc8aa07133b6144ea3"
        })
      )
      .then(function(data) {
        //   console.log(data.data.data)
        var rData = data.data.data;
        that.Products = rData;
        that.products.push(rData.product);
        that.providers.push(rData.provider);
        that.pvdpdts.push(rData.providerProduct);
        that.regions.push(rData.regionText);
        that.proBus.push(rData.providerBusiness);
        that.serInf = that.pvdpdts[0].serviceContent;
        // console.log(that.serInf);
      });
  },
  data() {
    return {
      products: [],
      providers: [],
      pvdpdts: [],
      regions: [],
      proBus: [],
      serInf: ""
    };
  }
};
</script>

<style lang="less" scoped>
body {
  background-color: #000;
}
.shopD {
  width: 100%;
}
.deTails {
  width: 100%;
  height: 6.1rem;
  border-bottom: 0.04rem solid #ccc;
  position: relative;
  .picture {
    width: 100%;
    height: 4.75rem;
    img {
      width: 100%;
      height: 4.75rem;
    }
  }
  .infor {
    width: 100%;
    height: 1.17rem;
    display: flex;
    flex-direction: column;
    background-color: rgba(82, 87, 88, 0.7);
    position: absolute;
    bottom: 22%;
    left: 0%;
    b {
      font-size: 0.3rem;
      color: #fff;
      margin-left: 0.4rem;
      margin-top: 0.15rem;
    }
    p {
      font-size: 0.2rem;
      color: #fff;
      margin-top: 0.2rem;
      margin-left: 0.4rem;
    }
  }

  .area {
    width: 90%;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.2rem;
    border-bottom: 0.01rem solid #ccc;
    margin: 0 auto;
  }
  .price {
    width: 80%;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.2rem;
    margin-left: 0.4rem;
    b {
      font-size: 0.3rem;
      color: red;
      margin-right: 0.3rem;
    }
  }
}
.title {
  width: 90%;
  height: 0.6rem;
  font-size: 0.2rem;
  font-weight: 700;
  line-height: 0.6rem;
  border-bottom: 0.02rem solid #2693d4;
  margin: 0 auto;
}
.service-Co {
  width: 100%;
  height: 3.2rem;
  border-bottom: 0.04rem solid #ccc;
  .Co-inf {
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    .inf-content {
      width: 90%;
      height: 2rem;
      display: flex;
      .inf-pic {
        width: 1.5rem;
        height: 1.5rem;
        img {
          width: 1.5rem;
          height: 1rem;
          margin-top: 0.5rem;
        }
      }
      .inf-text {
        width: 70%;
        height: 2rem;
        p {
          font-size: 0.2rem;
          margin: 0.1rem 0.4rem;
          span {
            display: inline-block;
            width: 1.05rem;
            height: 0.14rem;
            background: url(../../assets/HomePageimages/diamonds_03.png);
            background-size: 100% 100%;
          }
        }
        div {
          width: 1rem;
          height: 0.28rem;
          border: 0.01rem solid #2693d4;
          border-radius: 0.03rem;
          font-size: 0.2rem;
          color: #2693d4;
          text-align: center;
          line-height: 0.28rem;
          margin-left: 0.4rem;
          cursor: pointer;
        }
      }
    }
    .inf-icon {
      width: 90%;
      height: 0.4rem;
      display: flex;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        background: url(../../assets/HomePageimages/icon03.png) no-repeat;
        background-size: 100% 100%;
      }
      p {
        font-size: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
}
.service-Content {
  width: 100%;
  //   height: 3.85rem;
  border-bottom: 0.04rem solid #ccc;
  .content-inf {
    width: 90%;
    // height: 3.25rem;
    margin: 0 auto;
    font-size: 0.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
}
.evaluate {
  width: 100%;
  margin-bottom: 0.5rem;
  border-bottom: 0.04rem solid #ccc;
  .evaDetail {
    width: 90%;
    margin: 0 auto;
    display: flex;
    padding-bottom:0.2rem;
    .userPic {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: url(../../assets/HomePageimages/user.jpg);
      background-size: 100% 100%;
      margin-top:0.2rem;
    }
    .userEva {
        width:70%;
        margin-top:0.2rem;
        margin-left: 0.3rem;
      p {
        font-size: 0.2rem;
        span {
          display: inline-block;
          width: 1.05rem;
          height: 0.14rem;
          background: url(../../assets/HomePageimages/stars_03.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>