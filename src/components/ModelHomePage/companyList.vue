<template>
  <div class="page">
    <div class="home" v-for="(itemName,key,index) in ItemLists" :key="itemName.name" v-if="index==2">首页/{{itemName.name}}</div>
    <div class="box">
      <div class="left">
        <div class="innerT">
          <div class="serverRow Row">
            <div class="server">服务分类</div>
            <div class="serverList">
              <div class="innerServer" v-for="(itemName,key,index) in ItemLists" :key="itemName.name" v-if="index==2">
                <!-- <div style="font-size:20px">{{key}}{{index}}{{itemName.name}}</div> -->
                <div v-for="itemNameII in itemName.itemList" :key="itemNameII.name" class="innerServer">
                  <div class="lists">{{itemNameII.name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="typeRow Row">
            <div class="type">类型</div>
            <div class="typeList" v-for="(itemName,key,index) in ItemLists" :key="itemName.name" v-if="index==2">
              <div class="typeList" v-for="(itemNameII, key,index) in itemName.itemList" :key="itemNameII.name" v-if="index==0">
                <div v-for="itemNameIII in itemNameII.itemList" :key="itemNameIII.name">
                  <div class="lists">{{itemNameIII.name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="spaceRow Row">
            <div class="space">服务区域</div>
            <div class="spaceList">
              <v-distpicker province="北京市" city="市辖区" area=""></v-distpicker>
            </div>
          </div>
        </div>
        <div class="innerB">
          <div class="innerBt">
            <div class="infBox">综合排序</div>
            <div class="infBox">价格↑↑</div>
          </div>
          <div class="innerBb">
            <div class="B-lable">
              <div class="lables">商品</div>
              <div class="lables">价格</div>
            </div>
            <div class="B-lists" v-for="(Product,key,index) in products" :key="Product.id">
              <div class="listImg">
                <img :src="'http://115.182.107.203:8088/xinda/pic'+Product.productImg" alt="">
              </div>
              <div class="listInf">
                <div class="infLeft">
                  <b>{{Product.serviceName}}</b>
                  <p>{{Product.serviceInfo}}</p>
                  <p>
                    <span>{{Product.providerName}}</span>
                    <span>{{Product.regionName}}</span>
                  </p>
                </div>
                <div class="infRight">
                  <h2>￥{{Product.marketPrice}}</h2>
                  <div class="buttons">
                    <button>立即购买</button>
                    <button>加入购物车</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="platform"></div>
        <p class="">平台担保</p>
        <div class="quality"></div>
        <p class="">优质服务</p>
        <div class="process"></div>
        <p class="">过程监督</p>
        <div class="added"></div>
        <p class="">增值服务</p>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="8" :page-size="5">
    </el-pagination>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  methods: {
    changePage: function() {
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 5,
            limit: 5,
            productTypeCode: "4",
            sort: 2
          })
        )
        .then(function(data) {
          var gData = data.data.data;
          that.products = gData;
          // console.log(that.products);
        });
    }
  },
  created() {
    var that = this;
    this.ajax.post("/xinda-api/product/style/list").then(function(data) {
      var rData = data.data.data;
      that.ItemLists = rData;
      // console.log(that.ItemLists);
    });
    this.ajax
      .post(
        "/xinda-api/product/package/grid",
        this.qs.stringify({
          start: 0,
          limit: 5,
          productTypeCode: "4",
          sort: 2
        })
      )
      .then(function(data) {
        var gData = data.data.data;
        that.products = gData;
        console.log(that.products);
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
.page {
  max-width: 1200px;
  margin: 26px auto 0;
  .home {
    height: 13px;
    font-size: 13px;
    line-height: 13px;
    color: #2a2a2a;
    margin-bottom: 7px;
  }
}
.box {
  display: flex;
  .left {
    width: 948px;
    .innerT {
      border: 1px solid #ccc;
      border-top: none;
      margin-bottom: 25px;
      background-color: #eee;
    }
    .innerB {
      width: 946px;
      border: 1px solid #ccc;
      .innerBt {
        width: 946px;
        height: 40px;
        display: flex;
        background-color: #eee;
        border-bottom: 1px solid #ccc;
        .infBox {
          width: 100px;
          height: 40px;
          font-size: 12px;
          line-height: 40px;
          text-align: center;
        }
        .infBox:hover {
          background-color: #2693d4;
          color: #fff;
          cursor: pointer;
        }
      }
      .innerBb {
        width: 946px;
        .B-lable {
          width: 926px;
          margin: 0 auto;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          .lables {
            width: 100px;
            height: 40px;
            font-size: 12px;
            line-height: 40px;
            text-align: center;
          }
        }
        .B-lists {
          width: 926px;
          height: 110px;
          margin: 0 auto;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          display: flex;
          .listImg {
            width: 98px;
            height: 98px;
            border: 1px solid #ccc;
            img {
              width: 98px;
              height: 98px;
            }
          }
          .listInf {
            width: 826px;
            height: 110px;
            display: flex;
            .infLeft {
              width: 640px;
              height: 100px;
              b {
                display: block;
                font-size: 16px;
                margin-left: 20px;
                margin-bottom: 20px;
              }
              p {
                font-size: 14px;
                margin-left: 20px;
                margin-bottom: 15px;
                span {
                  margin-right: 50px;
                }
              }
            }
            .infRight {
              width: 186px;
              height: 100px;
              h2 {
                color: red;
                text-align: center;
                margin: 20px auto;
              }
              .buttons {
                button {
                  width: 90px;
                  height: 30px;
                  color: #fff;
                  border-radius: 3px;
                  background-color: #2693d4;
                  border: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 236px;
    height: 658px;
    margin-left: 12px;
    border: 1px solid #ccc;
    padding: 0 37px 0 28px;
    box-sizing: border-box;
    div {
      width: 93px;
      height: 93px;
      margin: 13px auto 29px;
      border-radius: 50%;
      background: url(../../assets/index/Sprites.png);
    }
    p {
      width: 171px;
      height: 29px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      line-height: 29px;
      text-align: center;
    }
    p:last-child {
      border: none;
    }
    .platform {
      background-position: -239px 20px;
    }
    .quality {
      background-position: -239px -76px;
    }
    .process {
      background-position: -230px -160px;
    }
    .added {
      background-position: -250px -270px;
    }
  }
}

.Row {
  height: 40px;
  border-top: 1px solid #ccc;
  display: flex;
  .server {
    width: 98px;
    height: 40px;
    border-right: 1px solid #ccc;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
  }
  .serverList {
    width: 847px;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    .lists {
      height: 25px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 25px;
      margin: 5px 10px;
      padding: 2px 5px;
    }
    .innerServer {
      display: flex;
    }
  }
  .innerServer {
    display: flex;
  }
  .type {
    width: 98px;
    height: 40px;
    border-right: 1px solid #ccc;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
  }
  .typeList {
    width: 847px;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    .lists {
      height: 25px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 25px;
      margin: 5px 10px;
      padding: 2px 5px;
    }
  }
  .lists:hover {
    background-color: #2693d4;
    color: #fff;
    cursor: pointer;
  }

  .space {
    width: 98px;
    height: 40px;
    border-right: 1px solid #ccc;
    font-size: 15px;
    color: #000;
    line-height: 40px;
    text-align: center;
  }
}
</style>