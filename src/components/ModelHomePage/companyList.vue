<template>
  <div class="page">
    <div class="home">首页/公司工商</div>
    <div class="box">
      <div class="left">
        <div class="innerT">
          <div class="serverRow Row">
            <div class="server">服务分类</div>
            <div class="serverList">
              <div v-for="(itemNameII,key) in ItemLists" :key="itemNameII.name" class="innerServer">
                <div class="lists" @click="types(key)">{{itemNameII.name}}</div>
              </div>
            </div>
          </div>
          <div class="typeRow Row">
            <div class="type">类型</div>
            <div v-for="(itemNameIII,key) in subList" :key="itemNameIII.name">
              <div class="lists" @click="kinds(key)">{{itemNameIII.name}}</div>
            </div>
          </div>
          <div class="spaceRow Row">
            <div class="space">服务区域</div>
            <div class="spaceList">
              <distpicker @selected="selected"></distpicker>
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
            <div class="B-lists" v-for="Product in products" :key="Product.id">
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
                  <h2>￥{{Product.price}}</h2>
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
  </div>
</template>

<script>
import distpicker from "../distpicker";
export default {
  components: { distpicker },
  methods: {
    selected: function(code) {//省市区三级联动
      this.seleCode = code;
      console.log(this.seleCode);
    },
    types(key) {
      //类型菜单匹配分类菜单
      // console.log(this);
      this.subList = this.ItemLists[key].itemList;
      this.typecode = this.ItemLists[key].code;
      var typeCode = this.typecode;
      // console.log(typeCode);
      this.reqData(typeCode); //按分类传递code参数切换列表
    },
    kinds(key) {//点击三级菜单切换列表匹配
      // console.log(this.subList[key].id);
      var productId = this.subList[key].id;
      this.getData(productId);
    },
    reqData: function(typecode) {
      //按分类选择列表渲染
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 0,
            limit: 5,
            productTypeCode: typecode,
            sort: 2
          })
        )
        .then(function(data) {
          var gData = data.data.data;
          that.products = gData;
          // console.log(that.products);
        });
    },
    getData(productId) { //按类型渲染列表
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 0,
            limit: 5,
            productTypeCode: "0",
            productId: productId,
            sort: 2
          })
        )
        .then(function(data) {
          var gData = data.data.data;
          that.products = gData;
          // console.log(that.products);
        });
    },
    changePage: function() {
      var that = this;
      this.reqData();
    }
  },
  created() {
    // console.log(name);

    var that = this;
    this.ajax.post("/xinda-api/product/style/list").then(function(data) {
      var rData = data.data.data;
      for (const key in rData) {
        if (rData[key].name == "公司工商") {
          that.ItemLists = rData[key].itemList;
          break;
        }
      }
      that.types("1b58d4f1f258495e8bf4b8a2df5c0e8e"); //默认渲染公司注册

      console.log(that.ItemLists);
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
        // console.log(that.products);
      });
  },
  data() {
    return {
      ItemLists: [],
      products: [],
      name: "",
      subList: [],
      typecode: "",
      productId: "",
      seleCode: ""
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
  .lists {
    height: 25px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 25px;
    margin: 5px 2px;
    padding: 2px 5px;
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

.spaceList {
  padding: 5px 0 8px 12px;
  box-sizing: border-box;
  .area {
    width: 86px;
    height: 20px;
  }
}

.pChange {
  margin: 30px 0 200px;
  padding: 0 500px;
}
</style>