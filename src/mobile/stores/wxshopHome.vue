<template>
    <div class="shophome">
        <div><img :src="providerImg" alt=""></div>
        <p class="name">{{name}}</p>
        <p class="storeinfo">{{providerInfo}}</p>
        <div>
            <p>所有服务</p>
        </div>
        <div v-for="serv in servs" :key="serv.id" class="serv" @click="servinfo(serv.id)">
            <div><img :src="serv.providerImg" alt="店铺商品"></div>
            <div>
                <p>{{serv.serviceName}}</p>
                <p class="serviceInfo">{{serv.serviceInfo}}</p>
                <div>
                    <div>
                        <span><img src="../../assets/mobile/addIcon.jpg" alt="" class="addIcon"></span>
                        <p>{{serv.regionName}}</p>
                    </div>
                    <p>
                        <span>￥{{serv.marketPrice}}</span>元</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route.query.storeId);
    this.getData(this.$route.query.storeId);
    this.getservData(this.start, this.limit, this.$route.query.storeId);
  },
  data() {
    return {
      providerImg: "", //
      name: "", //
      providerInfo: "", //..
      servs: [], //
      start: 0, //
      limit: "" //
    };
  },
  components: {},
  methods: {
    // 获取店铺数据
    getData(id) {
      if (this.$route.query.storeId) {
        var that = this;
        that.ajax
          .post(
            "/xinda-api/provider/detail",
            that.qs.stringify({
              id: id
            })
          )
          .then(function(data) {
            // console.log(data);
            if (data.data.data) {
              // console.log(data);
              that.datashow(data);
            }
          });
      } else {
      }
    },
    // 获取商品数据
    getservData(start, limit, id) {
      if (this.$route.query.storeId) {
        var that = this;
        that.ajax
          .post(
            "/xinda-api/product/package/grid",
            that.qs.stringify({
              start: start,
              limit: limit,
              providerId: id,
              sort: 2
            })
          )
          .then(function(data) {
            // console.log(data);
            if (data.data.data.length) {
              // console.log(data);
              that.servdatashow(data);
            }
          });
      } else {
      }
    },
    // 处理店铺下载数据
    datashow(data) {
      var data = data.data.data;
      this.providerImg =
        "http://115.182.107.203:8088/xinda/pic" + data.providerImg + "";
      this.name = data.name;
      this.providerInfo = data.providerInfo;
    },
    // 处理服务内容数据
    servdatashow(data) {
      var data = data.data.data;
      for (let i = 0; i < data.length; i++) {
        data[i].providerImg =
          "http://115.182.107.203:8088/xinda/pic" + data[i].providerImg + "";
        data[i].regionName = data[i].regionName.substr(3).replace(/-/g, "  ");
      }
      this.servs = data;
    },
    // 服务内容点击事件
    servinfo(id) {
      this.$router.push({ path: "/m/shop/shopDetail", query: { sId: id } });
    }
  }
};
</script>

<style lang="less" scoped>
.shophome {
  width: 100%;
  margin: 0.65rem auto 1rem;
  // 顶部logo
  > div:first-child {
    width: 1.06rem;
    height: 1.1rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.85rem;
      height: 0.85rem;
    }
  }
  // 店铺名称
  .name {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 0.4rem;
  }
  // 店铺介绍
  .storeinfo {
    margin: 0 0.25rem;
    text-indent: 0.6rem;
    line-height: 0.44rem;
    font-size: 0.3rem;
    margin-top: 0.65rem;
    color: #a3a3a3;
  }
  // 服务标题
  > div:nth-child(4) {
    width: 100%;
    height: 0.52rem;
    border-bottom: 0.01rem solid #2693d4;
    line-height: 0.52rem;
    margin-top: 0.4rem;
    margin-bottom: 0.26rem;
    > p {
      font-size: 0.3rem;
      margin-left: 0.22rem;
    }
  }
  // 服务内容
  .serv {
    width: 100%;
    height: 2.12rem;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #c3c3c3;
    // logo
    > div:first-child {
      width: 1.72rem;
      height: 1.72rem;
      margin-left: 0.17rem;
      margin-right: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
      }
    }
    // 内容
    > div:last-child {
      width: 72%;
      height: 1.72rem;
      font-size: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // 商品名字
      > p:first-child {
        font-size: 0.28rem;
        line-height: .28rem;
      }
      // 商品介绍
      .serviceInfo {
        font-size: 0.22rem;
        line-height: 0.30rem;
      }
      // 地址与价格
      > div:nth-child(3) {
        display: flex;
        justify-content: space-between;
        // 地址
        > div {
          display: flex;
          align-items: center;
          > span {
            width: 0.3rem;
            height: 0.4rem;
            margin-right: 0.1rem;
            padding: .075rem .09rem;
            box-sizing: border-box;
            .addIcon {
              width: 0.15rem;
              height: 0.21rem;
            }
          }
          > p {
            font-size: 0.18rem;
            line-height: .40rem;
          }
        }
        // 价格
        > p {
          font-size: 0.15rem;
          margin-right: 0.45rem;
          span {
            font-size: 0.3rem;
            margin-right: 0.12rem;
            font-weight: 600;
            color: #ff1418;
          }
        }
      }
    }
  }
}
</style>
