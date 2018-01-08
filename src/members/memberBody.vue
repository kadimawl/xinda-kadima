<template>
    <div class="myorder" @click="myorderclick">
        <!-- 顶部标签 -->
        <div class="topname">
            <p>我的订单</p>
        </div>
        <!-- 订单号搜索框 -->
        <div class="search">
            <p>订单号：</p>
            <input v-model="inputcode" placeholder="请输入订单号搜索">
            <button @click="searchs">搜索</button>
            <span v-if="msg">{{sermsg}}</span>
        </div>
        <!-- 创建时间 -->
        <div class="time">
            <p>创建时间：</p>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="datepick1"></el-date-picker>至
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" class="datepick2"></el-date-picker>
        </div>
        <!-- 订单列表 -->
        <div class="list">
            <p class="name">商品名称</p>
            <p class="unitprice">单价</p>
            <p class="amount">数量</p>
            <p class="sum">总金额</p>
            <p class="orderStatus">订单状态</p>
            <p class="orderHandle">订单操作</p>
        </div>
        <!-- 订单展示 -->
        <div class="listshow">
            <div class="innerbox" v-for="list in lists" :key="list.id">
                <div class="codetime">
                    <p>订单号：{{list.businessNo}}</p>
                    <p>下单时间：{{list.createTime}}</p>
                </div>
                <div class="codebody">
                    <div>
                        <div class="all" v-for="serv in list.servitem" :key="serv.id">
                            <div>
                                <!-- 公司logo图片 接口数据无logo图片链接-->
                                <div class="logo"><img src="../assets/icon.png" alt="公司logo"></div>
                                <div class="descr">
                                    <p>{{serv.providerName}}</p>
                                    <p>{{serv.serviceName}}</p>
                                </div>

                            </div>
                            <!-- 单价 -->
                            <p>￥{{serv.unitPrice}}</p>
                            <!-- 数量 -->
                            <p>{{serv.buyNum}}</p>
                        </div>
                    </div>
                    <!-- 总价 -->
                    <div class="pcommon">
                        <p>￥{{list.totalPrice}}</p>
                    </div>
                    <!-- 订单状态 -->
                    <div class="pcommon">
                        <p>{{list.status}}</p>
                    </div>
                    <!-- 操作按钮 -->
                    <div v-if="list.status=='已完成'" class="finish">
                        <p>交易完成</p>
                    </div>
                    <div v-if="list.status=='等待买家付款'" class="waitpay">
                        <div>
                            <button @click="payfor(list.businessNo,list.status)">付款</button>
                            <p @click="remove(list.id)">删除订单</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 错误提示框 -->
        <div class="errorbox" v-if="errorshow">
            <p :style="{color:acolor}">{{error}}</p>
        </div>
        <!-- 删除订单提示框 -->
        <div class="remove" v-if="conRemove" :style="{height:heights,width:widths}">
            <div class="removebox">
                <div>
                    <p>确认删除这个订单吗</p>
                    <span @click="cancel">X</span>
                </div>
                <div>
                    <button @click="confirm" class="confirm">确定</button>
                    <button @click="cancel" class="cancel">取消</button>
                </div>
            </div>
        </div>
        <!-- 翻页组件 -->
        <pageturn :total="total" :pagesize="pagesize" @pagevary="pagevary"></pageturn>
    </div>

</template>

<script>
//功能就差一个翻页功能
// 引入模块
var moment = require("moment");
import { mapActions, mapGetters } from "vuex";
import { DatePicker } from "element-ui";
import pageturn from "./pageturn";
export default {
  // 拉取数据
  created() {
    this.msg = "false";
    this.errorshow = false;
    // 未登录不拉取数据
    if (this.getName) {
      this.getData(
        this.pagenum,
        this.pagesize,
        this.value1,
        this.value2,
        this.inputcode
      );
    }
  },
  watch: {
    pagenum(newpage, oldpage) {
      this.getData(
        newpage,
        this.pagesize,
        this.value1,
        this.value2,
        this.inputcode
      );
    }
  },
  data() {
    return {
      value1: "", //时间输入框开始
      value2: "", //时间输入框结束
      inputcode: "", //订单编号输入
      msg: false, //控制提示框
      sermsg: "", //提示内容
      lists: [], //循环数组
      searchR: "s", //将搜索的索引赋给本变量
      errorshow: false, //控制错误框
      error: "", //错误提示
      acolor: "#ff4649", //错误提示的颜色
      pagenum: 0, //
      pagesize: 2, //
      total: "", //总条目
      conRemove: false, //确认删除
      orderid: "", //订单id
      heights: window.innerWidth + "px", //
      widths: window.innerWidth + "px" //
    };
  },
  computed: {
    ...mapGetters(["getName"])
  },
  components: {
    pageturn,
    [DatePicker.name]: DatePicker
  },
  methods: {
    // 调用数据公共方法
    getData(start, limit, time1, time2, code) {
      var that = this;
      that.ajax
        .post(
          "/xinda-api/business-order/grid",
          that.qs.stringify({
            start: start,
            limit: limit,
            startTime: time1,
            endTime: time2,
            businessNo: code
          })
        )
        .then(function(data) {
          if (data.data.data && data.data.data.length) {
            that.businessshow(data);
          } else {
            if (that.error != "删除成功") {
              that.msg = true;
              that.sermsg = "亲，没有找到订单";
              that.list = [];
            }
            that.total = "";
            that.lists = "";
          }
        });
    },
    // 自定义事件
    pagevary(msg) {
      this.pagenum = msg * this.pagesize;
    },
    // // 处理ajax获取的business数据显示在页面
    businessshow(data) {
      if (data.data.data.length) {
        this.total = data.data.totalCount + "";
        //获取订单总数，传给翻页组件
        var data = data.data.data;
        for (let i = 0; i < data.length; i++) {
          data[i].createTime = moment(data[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          data[i].servitem = [];
          //关于订单状态
          if (data[i].status == 1) {
            data[i].status = "等待买家付款";
          } else if (data[i].status == 4) {
            data[i].status = "已完成";
          }
          var orderN = data[i].businessNo;
          var that = this;
          that.ajax
            .post(
              "/xinda-api/service-order/grid",
              that.qs.stringify({
                businessNo: orderN
              })
            )
            .then(function(servdata) {
              var servdata = servdata.data.data;
              for (var key in servdata) {
                data[i].servitem.push(servdata[key]);
              }
            });
        }
        this.lists = data;
      }
    },

    // 转换为时间戳
    revertT(times) {
      return Date.parse(new Date(times)) / 1000;
    },
    //页面点击
    myorderclick() {
      var that = this;
      if (this.errorshow == true || this.msg == true) {
        setTimeout(function() {
          that.errorshow = false;
          that.msg = false;
        }, 4000);
      }
    },
    // 订单号搜索
    searchs: function() {
      if (this.inputcode == "" && this.value1 == "" && this.value2 == "") {
        return;
      } else if (this.inputcode != "") {
        // 简单验证订单号
        if (/^S1\d{18}$/.test(this.inputcode)) {
          var start = "";
          var end = "";
          if (this.value1 != "") {
            var startD = new Date(this.value1);
            start =
              startD.getFullYear() +
              "-" +
              (startD.getMonth() + 1) +
              "-" +
              startD.getDate();
          }
          if (this.value2 != "") {
            var endD = new Date(this.value2);
            end =
              endD.getFullYear() +
              "-" +
              (endD.getMonth() + 1) +
              "-" +
              endD.getDate();
          }
          this.getData(this.pagenum, this.pagesize, start, end, this.inputcode);
        } else {
          this.sermsg = "请输入正确的订单号";
          this.inputcode = "";
          this.msg = "true";
        }
      } else {
        var start = "";
        var end = "";
        if (this.value1 != "") {
          var startD = new Date(this.value1);
          start =
            startD.getFullYear() +
            "-" +
            (startD.getMonth() + 1) +
            "-" +
            startD.getDate();
        }
        if (this.value2 != "") {
          var endD = new Date(this.value2);
          end =
            endD.getFullYear() +
            "-" +
            (endD.getMonth() + 1) +
            "-" +
            endD.getDate();
        }
        this.getData(this.pagenum, this.pagesize, start, end);
      }
    },
    // 付款
    payfor: function(num, status) {
      if (status == "等待买家付款") {
        this.$router.push({
          path: "/Order/orderdetail",
          query: { orderNo: num }
        });
      } else {
        that.errorshow = true; //提示
        that.error = "该订单已付款";
      }
    },
    // 删除订单
    remove: function(code) {
      this.conRemove = true;
      this.orderid = code;
    },
    // 隐藏删除订单提示框
    cancel() {
      this.conRemove = false;
    },
    // 确定删除
    confirm() {
      // 向后台发送删除请求
      var that = this;
      this.conRemove = false;
      that.ajax
        .post(
          "/xinda-api/business-order/del",
          that.qs.stringify({
            id: that.orderid
          })
        )
        .then(function(data) {
          // 成功后重新获取数据，重新存缓存
          if (data.data.status == 1) {
            that.errorshow = true; //提示
            that.error = "删除成功";
            that.acolor = "#55a4dc";
            that.getData(
              that.pagenum,
              that.pagesize,
              that.value1,
              that.value2,
              that.inputcode
            );
          } else {
            that.errorshow = true; //提示
            that.error = data.data.msg;
            that.acolor = "#ff4745";
          }
        });
      this.orderid = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
// 最大的盒子
.myorder {
  width: 970px;
  margin-left: 30px;
  margin-top: 30px;
  display: block;
  flex-direction: column;
  // 顶部标签
  .topname {
    width: 90%;
    height: 32px;
    border-bottom: 2px solid #e9e9e9;
    text-align: center;
    margin-bottom: 16px;
    p {
      width: 115px;
      color: #73b2de;
      height: 32px;
      z-index: 5;
      line-height: 32px;
      font-size: 16px;
      border-bottom: 2px solid #2693d4;
    }
  }
  // 订单搜索部分
  .search {
    height: 40px;
    line-height: 40px;
    display: flex;
    margin-top: 25px;
    span {
      display: block;
      margin-left: 40px;
      color: #e42b12;
    }
    p {
      width: 80px;
      color: #888888;
      margin-right: 20px;
    }
    input {
      width: 220px;
      height: 40px;
      border: 1px solid #b0b0b0;
    }
    button {
      width: 72px;
      height: 26px;
      border: 1px solid #2693d4;
      border-radius: 4px;
      margin-left: 50px;
      margin-top: 6px;
      background: #ffffff;
      color: #66a9dd;
      box-shadow: 0 0 1px 1px #66a9dd;
      cursor: pointer;
    }
  }
  // 创建时间
  .time {
    height: 40px;
    display: flex;
    margin: 30px 0 30px 0;
    line-height: 40px;
    p {
      color: #888888;
      margin-right: 20px;
    }
    .datepick1 {
      margin-right: 20px;
    }
    .datepick2 {
      margin-left: 20px;
    }
  }
  // 列表
  .list {
    display: flex;
    width: 932px;
    height: 32px;
    background: #f8f8f8;
    margin-bottom: 10px;
    p {
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
    }
    .name {
      width: 320px;
      padding-left: 40px;
    }
    .unitprice {
      width: 110px;
      text-align: center;
    }
    .amount {
      width: 110px;
      text-align: center;
    }
    .sum {
      width: 142px;
      text-align: center;
    }
    .orderStatus {
      width: 142px;
      text-align: center;
    }
    .orderHandle {
      width: 120px;
      text-align: center;
    }
  }

  // 错误提示框
  .errorbox {
    width: 300px;
    height: 100px;
    position: absolute;
    left: 1250px;
    top: 300px;
    text-align: center;
    line-height: 100px;
    background: #f8f8f8;
    z-index: 4;
    p {
      font-size: 18px;
    }
  }
  // 删除订单提示框
  .remove {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.7;
    z-index: 5;
    background: #000;
    .removebox {
      width: 300px;
      height: 120px;
      background: #ffffff;
      margin: 350px auto;
      box-shadow: 3px 3px 2px #8d8d8d;
      z-index: 10;
      > div:first-child {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background: #e9e9e9;
        p {
          line-height: 40px;
          margin-left: 10px;
        }
        span {
          margin-right: 10px;
          margin-top: 2px;
          font-size: 20px;
          cursor: pointer;
        }
      }
      > div:last-child {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        z-index: 30;
        button {
          width: 65px;
          height: 36px;
          border-radius: 10px;
          cursor: pointer;
        }
        .confirm {
          background: #2693d4;
          margin-right: 10px;
        }
        .cancel {
          background: #e9e9e9;
        }
      }
    }
  }
}

// 订单展示列表，主体部分
.listshow {
  width: 940px;
  height: auto;
  // 获取订单盒子
  .innerbox {
    width: 100%;
    margin-bottom: 10px;
    // 订单编号与时间
    .codetime {
      width: 100%;
      height: 37px;
      display: flex;
      background: #f8f8f8;
      color: #3e3e3e;
      border: 1px solid #eee;
      border-bottom: none;
      p {
        font-size: 12px;
        line-height: 37px;
        margin-left: 25px;
      }
    }
    // 订单主体
    .codebody {
      width: 100%;
      display: flex;
      border: 1px solid #eee;
      color: #828282;
      > div:first-child {
        width: 533px;
        border-right: 1px solid #eee;
        .all:first-child{
            border-top: none;
        }
        .all {
          width: 100%;
          height: 67px;
          display: flex;
          border-top: 1px solid #eee;
          > div:nth-child(1) {
            width: 323px;
            display: flex;
            // 装logo的盒子
            .logo {
              width: 72px;
              height: 67px;
              img {
                width: 48px;
                height: 48px;
                margin: 9px 11px 0 12px;
              }
            }
            .descr {
              width: 290px;
              // 服务内容
              > p {
                height: 33px;
                line-height: 33px;
              }
            }
          }
          > p {
            width: 110px;
            text-align: center;
            height: 67px;
            line-height: 67px;
            font-size: 13px;
          }
        }
      }
      // 状态和总价
      .pcommon {
        width: 140px;
        height: 67px;
        text-align: center;
        border-right: 1px solid #eee;
        p {
          color: #2393d3;
          font-size: 12px;
          line-height: 67px;
        }
      }
      // 操作按钮
      .waitpay {
        width: 120px;
        height: 100%;
        text-align: center;
        border: 1px solid #f8f8f8;
        div {
          height: 50px;
          margin: auto;
          button {
            width: 54px;
            height: 21px;
            border: 1px solid #2693d4;
            border-radius: 3px;
            background: #fff;
            color: #409cd7;
            margin-bottom: 9px;
            font-size: 13px;
            cursor: pointer;
          }
          p {
            color: #ff4747;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
      .finish {
        width: 120px;
        text-align: center;
        border: 1px solid #f8f8f8;
        p {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
