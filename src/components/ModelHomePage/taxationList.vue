<template>
  <div class="page">
    <div class="home">首页/财税服务</div>
    <div class="box">
      <div class="left">
        <div class="innerT">
          <div class="serverRow Row">
            <div class="server">服务分类</div>
            <div class="serverList">
              <div v-for="(itemNameII,key,typeCode) in ItemLists" :key="itemNameII.name" class="innerServer">
                <div class="lists" @click="types(key,typeCode)" :class="[(currentIndex|0)===typeCode?'color2693d4':'color000']">{{itemNameII.name}}</div>
              </div>
            </div>
          </div>
          <div class="typeRow Row">
            <div class="type">类型</div>
            <div v-for="(itemNameIII,key,index) in subList" :key="itemNameIII.name">
              <div class="lists" @click="kinds(key,index)" :class="[(listIndex|0)===index?'color2693d4':'color000']">{{itemNameIII.name}}</div>
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
                <img :src="tUrl+Product.productImg" alt="">
              </div>
              <div class="listInf">
                <div class="infLeft" @click="todetail(Product.id)">
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
                    <button @click="toPay(Product.id)">立即购买</button>
                    <button @click="addCart(Product.id)">加入购物车</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页组件 -->
        <pageturn :total="total" :pagesize="pagesize" @pagevary="pagevary"></pageturn>
        <!-- <div class="pageC" v-show="pageShow">
          <div class="prev" @click="prev(typecode)">上一页</div>
          <ul>
            <li v-for="(currentPage,index) in pageObj" :class="[index==(pageChange|0)?'pageColor':'pageccc']" :key="index" @click="pageIna(currentPage,index,typecode)">{{currentPage}}</li>
          </ul>
          <div class="next" @click="next(typecode)">下一页</div>
        </div> -->
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
import plugins from "../../plugins";
import addCart from "../../addCart";
import { mapActions, mapGetters } from "vuex";
import { MessageBox } from "element-ui";
import pageturn from "../../components/pageturn";
export default {
  components: { distpicker },
  computed: {
    ...mapGetters(["getName"])
  },
  methods: {
    ...mapActions(["setNum"]),
    // 转换为时间戳
    revertT(times) {
      return Date.parse(new Date(times)) / 1000;
    },
    // 自定义事件
    pagevary(msg) {
      this.pagenum = msg * this.pagesize;
    },
    //页面点击
    myorderclick() {
      var that = this;
      if (this.msg == true) {
        setTimeout(function() {
          that.msg = false;
        }, 4000);
      }
    },
    //三级联动选择code
    selected: function(code) {
      this.seleCode = code;
    },
    isLogged(id) {
      var that = this;
      if (!this.getName) {
        MessageBox.confirm("请先进行登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              path: "/outter/login",
              query: { redirect: "/tabs/taxationList" }
            });
          })
          .catch(() => {});
      } else {
        plugins(id, that, "/tabs/shoppingCart"); //立即购买公共方法
      }
    },

    types(key, typeCode) {
      this.currentIndex = typeCode;
      //类型菜单匹配分类菜单
      this.subList = this.ItemLists[key].itemList;
      this.typecode = this.ItemLists[key].code;
      var typeCode = this.typecode;
      this.reqData(typeCode); //按分类传递code参数切换列表
    },
    kinds(key, index) {
      this.listIndex = index;
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
            limit: 3,
            productTypeCode: typecode,
            sort: 2
          })
        )
        .then(function(data) {
          var gData = data.data.data;
          that.products = gData;
          var totalCount = data.data.totalCount;
          if (totalCount <= 3) {
            that.pageShow = false;
          } else {
            that.pageShow = true;
            var count = Math.ceil(totalCount / 3);
            that.lastCount = count;
            var pageObj = {};
            for (var i = 0; i < count; i++) {
              pageObj[i] = i + 1;
            }
            that.pageObj = pageObj;
            that.pageChange = 0;
          }
        });
    },
    getData(productId) {
      //按类型渲染列表
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 0,
            limit: 3,
            productTypeCode: "0",
            productId: productId,
            sort: 2
          })
        )
        .then(function(data) {
          var gData = data.data.data;
          that.products = gData;
        });
    },
    todetail(id) {
      //传参产品详情
      this.$router.push({
        path: "/detial",
        query: { shoppingId: id }
      });
      this.$router.push({
        path: "/detial/service",
        query: { shoppingId: id }
      });
    },
    toPay: function(id) {
      //立即购买
      var that = this;
      this.isLogged(id);
      //判断是否登录
      this.ajax.post("/xinda-api/sso/login-info").then(data => {
        if (data.data.status != 0) {
          this.ajax.post("/xinda-api/cart/cart-num").then(data => {
            var cartNum = data.data.data.cartNum;
            that.setNum(cartNum);
          });
        }
      });
    },
    addCart: function(id) {
      var that = this;
      if (!this.getName) {
        MessageBox.confirm("请先进行登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              //登录之后在跳转回当前页
              path: "/outter/login",
              query: { redirect: "/tabs/taxationList" }
            });
          })
          .catch(() => {});
      } else {
        plugins(id, that); //加入购物车/立即购买公共方法
      }
      //判断是否登录
      this.ajax.post("/xinda-api/sso/login-info").then(data => {
        if (data.data.status != 0) {
          this.ajax.post("/xinda-api/cart/cart-num").then(data => {
            var cartNum = data.data.data.cartNum;
            that.setNum(cartNum);
          });
        }
      });
    },
    changePage: function() {
      this.reqData();
    },
    //翻页
    pageIna(currentPage, index, typecode) {
      this.pageChange = index;
      var that = this;
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: 0 + 3 * (currentPage - 1),
            limit: 3,
            productTypeCode: typecode,
            sort: 2
          })
        )
        .then(data => {
          var gData = data.data.data;
          that.products = gData;
        });
    },
    //上一页
    prev(typecode) {
      var that = this;
      this.pageChange < 1 ? 0 : (this.pageChange -= 1);
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: this.pageChange * 3,
            limit: 3,
            productTypeCode: typecode,
            sort: 2
          })
        )
        .then(data => {
          var gData = data.data.data;
          that.products = gData;
        });
    },
    //下一页
    next(typecode) {
      var that = this;
      if (this.pageChange < this.lastCount - 1) {
        this.pageChange -= -1;
      } else {
        this.pageChange = this.lastCount - 1;
      }
      this.ajax
        .post(
          "/xinda-api/product/package/grid",
          this.qs.stringify({
            start: this.pageChange * 3,
            limit: 3,
            productTypeCode: typecode,
            sort: 2
          })
        )
        .then(data => {
          var gData = data.data.data;
          that.products = gData;
        });
    }
  },
  created() {
    var that = this;
    this.ajax.post("/xinda-api/product/style/list").then(function(data) {
      var rData = data.data.data;
      for (const key in rData) {
        if (rData[key].name == "财税服务") {
          that.ItemLists = rData[key].itemList;
          break;
        }
      }
      that.types("09fb10e276744114a232ac04b7b72e5d"); //默认渲染审计报告
    });

    this.ajax
      .post(
        "/xinda-api/product/package/grid",
        this.qs.stringify({
          start: 0,
          limit: 3,
          productTypeCode: "3",
          sort: 2
        })
      )
      .then(function(data) {
        var gData = data.data.data;
        that.products = gData;
      });
    //判断是否登录
    this.ajax.post("/xinda-api/sso/login-info").then(data => {
      if (data.data.status != 0) {
        this.ajax.post("/xinda-api/cart/cart-num").then(data => {
          var cartNum = data.data.data.cartNum;
          that.setNum(cartNum);
        });
      } else {
        that.setNum(0);
      }
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
      seleCode: "",
      currentIndex: "",
      listIndex: "",
      pageShow: true,
      pageObj: {},
      lastCount: "",
      pageChange: 0,
      orderNo: "",
      cartNum: "",
      pagenum: 0, //
      pagesize: 3, //
      total: "", //总条目
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
          // height: 110px;
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
      background: url(../../assets/HomePageimages/Sprites.png);
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
    margin: 5px 10px;
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

.pageC {
  margin: 30px 0 200px;
  padding: 0 350px;
  display: flex;
  div {
    width: 66px;
    height: 34px;
    cursor: pointer;
    border: 1px solid #ccc;
    font-size: 13px;
    color: #ccc;
    text-align: center;
    line-height: 34px;
  }
  ul {
    display: flex;
    list-style: none;
  }
}
li {
  width: 37px;
  height: 34px;
  cursor: pointer;
  border: 1px solid #ccc;
  color: #ccc;
  text-align: center;
  line-height: 34px;
  margin: 0 6px;
}
.pageColor {
  color: #2693d4;
  border: 1px solid #2693d4;
}
.pageccc {
  border: 1px solid #ccc;
  color: #ccc;
}
.color2693d4 {
  background-color: #2693d4;
  color: #fff;
}
.color000 {
  background: #eee;
  color: #000;
}
</style>