<template>
    <div class="order">
        <p class="homepay">首页/支付</p>
        <!-- 订单详情框 -->
        <div class="orderDe">
            <p class="titlep">订单详情</p>
            <!-- 订单详情 -->
            <div class="detail">
                <p class="code">订单编号：
                    <span>{{code}}</span>
                </p>
                <p>创建时间：{{createT}}</p>
                <div>
                    <p>订单金额：
                        <span>￥{{price}}</span>元</p>
                    <div @click="liston()">订单明细&nbsp
                        <span :class="{'xuanz':xz}"></span>
                    </div>
                </div>
            </div>
            <!-- 订单明细隐藏内容，需通过外界传数据再创建 -->
            <div v-if="mingxi" class="mingxi">
                <div v-for="list in lists" :key="list.id" class="hidebox">
                    <p>服务名称：{{list.serviceName}}</p>
                    <p>单价：
                        <span>￥{{list.unitPrice}}</span>元</p>
                    <p>数量：
                        <span>{{list.buyNum}}</span>
                    </p>
                    <p>服务总额：
                        <span>{{list.totalPrice}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 支付方式框 -->
        <!-- 四种支付方式为单选框，采用了element ui组件，通过radio得知选择了哪个 -->
        <!-- 优点在于样式简单，缺点在于，插入图片超过了默认样式规定，改样式出现了困难，无法调整单选框的位置 -->
        <div class="paypattern">
            <p class="titlep">支付方式</p>
            <!-- 非网银支付 -->
            <div class="nowy">
                <p>非网银支付</p>
                <div>
                    <el-radio v-model="radio" label="1"><img src="../../assets/index/yinlian.png" alt=""> </el-radio>
                </div>
            </div>
            <!-- 平台支付 -->
            <div class="ptpay">
                <p>平台支付</p>
                <div>
                    <el-radio v-model="radio" label="2" class="weixinlabel"><img src="../../assets/index/weixin.png" class="weixinpay" alt="">&nbsp&nbsp
                        <span>微信支付</span>
                    </el-radio>
                    <el-radio v-model="radio" label="3"><img src="../../assets/index/zfb.png" alt="" class="kuaijiepay">&nbsp&nbsp
                        <span>快捷支付</span>
                    </el-radio>
                </div>
            </div>
            <!-- 自助转账 -->
            <div class="autopay">
                <p>自助转账</p>
                <span>因限额不能支付时，建议使用自助转账</span>
                <div>
                    <el-radio v-model="radio" label="4"><img src="../../assets/index/zsbank.png" alt=""></el-radio>
                </div>
            </div>
            <p class="beizhu">注：转账时请将订单编号备注在付款信息里，转账完成后，请通知客服</p>
        </div>
        <!-- 底部的结算按钮框 -->
        <div class="finalpay">
            <p class="total">金额总计：
                <span>￥{{price}}</span>
            </p>
            <button @click="pay">去结算</button>
        </div>
        
        <waitpay :displays="paywait" :type="type" :code="code" @close="close"></waitpay>
    </div>
</template>

<script>

import waitpay from "./waitpay"; //等待支付
import { Radio, Message } from "element-ui"; //按需引入组件
export default {
  created() {
    if (this.$route.query.orderNo) {
      var that = this;
      that.ajax
        .post(
          "/xinda-api/business-order/detail",
          that.qs.stringify({
            businessNo: that.$route.query.orderNo
          })
        )
        .then(function(data) {
          if (data.data.status == 1) {
            that.datashow(data);
          }
        });
    }
  },
  computed: {},
  data() {
    return {
      code: "", //产品编号
      createT: "", //创建时间
      price: "", //金额总计
      mingxi: false, //订单明细隐藏部分的控制条件
      radio: null, //单选框的值
      xz: false, //订单明细小三角旋转的控制条件
      paywait: false, //传参控制支付等待框
      type: "", //支付方式传参
      lists: [] //订单明细隐藏内容框
    };
  },
  components: {
    waitpay,
    [Radio.name]: Radio
  },
  methods: {
    // 处理订单数据
    datashow(data) {
      var databusi = data.data.data.businessOrder;
      this.lists = data.data.data.serviceOrderList;
      this.code = databusi.businessNo;
      this.createT = new Date(databusi.createTime).toLocaleDateString();
      this.price = databusi.totalPrice;
    },
    // 订单明细点击事件，通过订单数据去创建隐藏框的内容，待完成
    liston: function() {
      this.xz = !this.xz;
      this.mingxi = !this.mingxi;
    },
    // 去结算按钮的点击事件，跳转支付等待页面，然后根据支付状况去跳转其他页
    pay() {
      if (this.code) {
        // 选择了支付方式
        if (this.radio) {
          // 自助转账
          if (this.radio == 4) {
              Message({
            message: "亲，该支付方式正在开通中，请选择其他支付方式!",
            type: "warning"
          });
          } else if (this.radio == 1) {
            this.setpay("/xinda-api/pay/china-pay");
          } else if (this.radio == 3) {
            this.setpay("/xinda-api/pay/ali-pay");
          } else {
            this.paywait = true;
            this.type = this.radio;
          }
        } else {
          Message({
            message: "请选择支付方式!",
            type: "warning"
          });
        }
      } else {
        Message({
          message: "sorry，没有订单可以操作!",
          type: "warning"
        });
      }
    },
    // 向后台发送支付请求信息
    setpay(Url) {
      var that = this;
      this.ajax
        .post(
          Url,
          this.qs.stringify({
            businessNo: this.code
          })
        )
        .then(function(data) {
          sessionStorage.setItem("payfor", data.data);
          that.paywait = true;
          that.type = that.radio;
          var payfor = sessionStorage.getItem("payfor");
          window.open("/#/Order/payBank");
        });
    },

    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.order {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  // 页面所有的p标签
  p {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
  }
  // 顶部的p标签样式
  .homepay {
    margin-top: 10px;
    color: #a5a5a5;
  }
  // 订单详情样式
  .orderDe {
    margin-top: 10px;
    width: 100%;
    // 订单详情显示内容样式
    .detail {
      height: 70px;
      width: 100%;
      margin-top: 20px;
      border: 1px solid #bcbdbd;
      background: #f7f7f7;
      display: flex;
      justify-content: space-between;
      > p {
        line-height: 70px;
      }
      .code {
        margin-left: 40px;
        span {
          color: #5db9cb;
        }
      }
      // 右侧包含订单明细的盒子样式
      > div {
        margin-right: 40px;
        height: 70px;
        > p {
          line-height: 70px;
          span {
            color: #71afdd;
          }
        }
        > div {
          margin-top: 15px;
          text-align: center;
          color: #fb9e9e;
          cursor: pointer;
          > span {
            display: block;
            width: 0;
            border-top: 10px solid #fd6363;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            position: relative;
            top: -14px;
            left: 110px;
          }
        }
      }
    }
    // 订单明细隐藏数据的样式，其余部分在js部分
    .mingxi {
      width: 100%;
      height: auto;
      background: #f7f7f7;
      .hidebox {
        height: 70px;
        width: 100%;
        border: 1px solid #bcbdbd;
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          width: 300px;
          text-align: center;
          font-size: 18px;
          span {
            color: #5db9cb;
          }
        }
        p:nth-child(1) {
          width: 400px;
          margin-left: 40px;
          text-align: left;
        }
        p:nth-child(4) {
          width: 200px;
          margin-right: 40px;
        }
      }
    }
  }
  // 支付方式的盒子
  .paypattern {
    margin-top: 40px;
    width: 100%;
    // 非网银支付
    .nowy {
      margin-top: 20px;
      > p {
        color: #333333;
        margin-bottom: 15px;
      }
    }
    // 平台支付
    .ptpay {
      margin-top: 20px;
      > p {
        color: #333333;
        margin-bottom: 15px;
      }
      .weixinlabel {
        .weixinpay {
          padding: 0 10px;
        }
        margin-right: 20px;
      }
      .kuaijiepay {
        padding: 20px 20px 0 20px;
      }
    }
    // 自助转账
    .autopay {
      margin-top: 20px;
      > p {
        display: inline-block;
        color: #333333;
        margin-bottom: 15px;
      }
      > span {
        display: inline-block;
        color: #c6d7ed;
        margin-left: 20px;
        font-size: 18px;
      }
    }
    // 备注
    .beizhu {
      margin-top: 20px;
      color: #ff0000;
      font-weight: bold;
    }
  }
  // 订单明细小三角旋转180度的样式
  .xuanz {
    transform: rotate(180deg);
  }
  // 给订单详情支付方式大盒子top的p标签样式
  .titlep {
    width: 100%;
    border-bottom: 1px solid #bcbdbd;
    color: #6fc2c6;
    z-index: -1;
  }
  // element ui引用的单选框样式，及其难改，只微调了一部分
  .el-radio__label {
    img {
      padding-left: 20px;
    }
    span {
      font-size: 18px;
    }
  }
  // 底部的去结算部分
  .finalpay {
    width: 100%;
    margin-top: 20px;
    text-align: right;
    margin-right: 30px;
    .total {
      font-size: 20px;
      margin-right: 10px;
      span {
        color: #169bd5;
      }
    }
    button {
      width: 164px;
      height: 48px;
      border-radius: 5px;
      background: #169bd5;
      color: #fff;
      font-size: 20px;
      margin-top: 15px;
      margin-bottom: 100px;
      cursor: pointer;
    }
  }
}
</style>