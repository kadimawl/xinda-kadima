<template>
    <div class="order">
        <!-- 公共搜索头组件 -->
        <sele/>
        <p class="homepay">首页/支付</p>
        <!-- 订单详情框 -->
        <div class="orderDe">
            <p class="titlep">订单详情</p>
            <!-- 订单详情 -->
            <div class="detail">
                <p class="code">订单编号：<span>{{code}}</span></p>
                <p>创建时间：{{createT}}</p>
                <div>
                    <p>订单金额：<span>￥{{price}}</span>元</p>
                    <div @click="liston()">订单明细&nbsp<span :class="{'xuanz':xz}"></span></div>
                </div>
            </div>
            <!-- 订单明细隐藏内容，需通过外界传数据再创建 -->
            <div v-if="mingxi">

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
                    <el-radio v-model="radio" label="1"><img src="../../assets/index/yinlian.png" alt="" > </el-radio>
                </div>
            </div>
            <!-- 平台支付 -->
            <div class="ptpay">
                <p>平台支付</p>
                <div>
                    <el-radio v-model="radio" label="2" class="weixinlabel"><img src="../../assets/index/weixin.png" class="weixinpay" alt="" >&nbsp&nbsp<span>微信支付</span></el-radio>
                    <el-radio v-model="radio" label="3"><img src="../../assets/index/zfb.png" alt="" class="kuaijiepay">&nbsp&nbsp<span>快捷支付</span></el-radio>
                </div>
            </div>
            <!-- 自助转账 -->
            <div class="autopay">
                <p>自助转账</p><span>因限额不能支付时，建议使用自助转账</span>
                <div>
                    <el-radio v-model="radio" label="4"><img src="../../assets/index/zsbank.png" alt=""></el-radio>
                </div>
            </div>
            <p class="beizhu">注：转账时请将订单编号备注在付款信息里，转账完成后，请通知客服</p>
        </div>
        <!-- 底部的结算按钮框 -->
        <div class="finalpay">
            <p class="total">金额总计：<span>￥{{price}}</span></p>
            <button @click="pay">去结算</button>
        </div>
        <!-- 错误提示框 -->
        <div class="errorbox" v-if="errorts">
            <div><p>错误提示</p><span @click="errorstop">&#10005</span></div>
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>
//   所有功能都写完了，就差订单明细隐藏内容的js样式

// 引用组件
import sele from '../sele'
// vuex引用
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            code:'',//产品编号
            createT:'',//创建时间
            price:'800.00',//金额总计
            mingxi:false,//订单明细隐藏部分的控制条件
            radio:null,//单选框的值
            xz:false,//订单明细小三角旋转的控制条件
            error:'',//错误信息
            errorts:false,//控制错误提示的出现
        };
    },
    components:{sele},
    methods:{
        // 引入vuex方法
        ...mapActions(['setRadio']),
        // 订单明细点击事件，通过订单数据去创建隐藏框的内容，待完成
        liston:function(){
            this.xz=!this.xz;
            this.mingxi=!this.mingxi;

        },
        // 去结算按钮的点击事件，跳转支付等待页面，然后根据支付状况去跳转其他页
        pay(){
            this.errorts=false;
            // 选择了支付方式
            if(this.radio){
                // 自助转账
                if(this.radio==4){
                    this.errorts=true;
                    this.error='亲，该支付方式还未开通，请选择别的支付方式';
                    return;
                }else{//跳转支付等待界面// 调用vuex方法，并传参
                    this.setRadio(this.radio);
                    location.href='http://localhost:8080/#/order/waitpay'
                }
            }else{
                this.errorts=true;
                this.error='请选择支付方式!!';
                return;
            }
        },
        // 关闭错误提示框
        errorstop:function(){
            this.errorts=false;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
* {
    margin: 0;
    padding: 0;
}
.order{
    width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
    // 页面所有的p标签
    p{
        font-size: 18px;
        height: 30px;
        line-height: 30px;
    }
    // 顶部的p标签样式
    .homepay{
        margin-top:10px;
        color:#a5a5a5;
    }
    // 订单详情样式
    .orderDe{
        margin-top: 10px;
        width: 100%;
        // 订单详情显示内容样式
        .detail{
            height: 70px;
            width: 100%;
            margin-top: 20px;
            border: 1px solid #bcbdbd;
            background: #f7f7f7;
            display: flex;
            justify-content: space-between;
            >p{
                line-height: 70px;
            }
            .code{
                margin-left: 40px;
                span{
                    color:#5db9cb;
                }
            }
            // 右侧包含订单明细的盒子样式
            >div{
                margin-right: 40px;
                height: 70px;
                >p{
                    line-height: 70px;
                    span{
                        color: #71afdd;
                    }
                }
                >div{
                    margin-top: 15px;
                    text-align: center;
                    color: #fb9e9e;
                    cursor: pointer;
                    >span{
                        display: block;
                        width: 0;
                        border-top: 10px solid #fd6363;
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        position: relative;
                        top: -14px;
                        left: 130px;
                    }
                }
            }
        }
        // 订单明细隐藏数据的样式，其余部分在js部分
        .mingxi{
            width: 100%;
            background: #f7f7f7;
        }
    }
    // 支付方式的盒子
    .paypattern{
        margin-top: 40px;
        width: 100%;
        // 非网银支付
        .nowy{
            margin-top: 20px;
            >p{
                color: #333333;
                margin-bottom: 15px;
            }
        }
        // 平台支付
        .ptpay{
            margin-top: 20px;
            >p{
                color: #333333;
                margin-bottom: 15px;
            }
            .weixinlabel{
                .weixinpay{
                    padding: 0 10px;
                }
                margin-right: 20px;
            }
            .kuaijiepay{
                padding: 20px 20px 0 20px;
            }
        }
        // 自助转账
        .autopay{
            margin-top: 20px;
            >p{
                display: inline-block;
                color: #333333;
                margin-bottom: 15px;
            }
            >span{
                display: inline-block;
                color: #c6d7ed;
                margin-left: 20px;
                font-size: 18px;
            }
        }
        // 备注
        .beizhu{
            margin-top: 20px;
            color: #ff0000;
            font-weight: bold;
        }
    }
    // 订单明细小三角旋转180度的样式
    .xuanz{
        transform: rotate(180deg);
    }
    // 给订单详情支付方式大盒子top的p标签样式
    .titlep{
        width: 100%;
        border-bottom: 1px solid #bcbdbd;
        color: #6fc2c6;
    }
    // element ui引用的单选框样式，及其难改，只微调了一部分
    .el-radio__label{
        img{
            padding-left: 20px;
        }
        span{
            font-size: 18px;
        }
    }
    // 底部的去结算部分
    .finalpay{
        width: 100%;
        margin-top: 20px;
        text-align: right;
        margin-right: 30px;
        .total{
            font-size: 20px;
            span{
                color: #169bd5;
            }
        }
        button{
            width: 164px;
            height: 48px;
            border-radius: 5px;
            background:#169bd5;
            color: #fff;
            font-size: 20px;
            margin-top: 15px;
            margin-bottom: 100px;
        }
    }
    // 错误提示盒子的样式
    .errorbox{
        width: 450px;
        height: 160px;
        position: absolute;
        top: 500px;
        left: 800px;
        box-shadow: 2px 2px 2px #8d8d8d;
        >div{
            width: 450px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            line-height: 60px;
            >p{
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
            }
            span{
                display: block;
                width: 30px;
                height: 30px;
                font-size: 30px;
                cursor: pointer;
                margin-right: 20px;
            }
        }
        >p{
            width: 450px;
            height: 100px;
            color: #ff0000;
            font-weight: bold;
            font-size: 20px; 
            line-height: 100px;
            text-align: center;
        }
    }
    // 微信扫码框的样式
    .scanCode{
        width: 336px;
        height: 370px;
        position: absolute;
        top: 500px;
        left: 900px;
        box-shadow: 3px 3px 2px #8d8d8d;
        // 顶部
        .topbox{
            width:336px;
            height: 45px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            line-height: 45px;
            >p{
                height: 45px;
                line-height: 45px;
                margin-left: 20px;
            }
            >span{
                display: block;
                width: 30px;
                height: 30px;
                font-size: 20px;
                cursor: pointer;
                margin-right: 20px;
            }
        }
        // 二维码
        .scan{
            width: 336px;
            height: 230px;
            text-align: center;
            img{
                padding-top: 14px;
            }
            >p{
                height: 18px;
                font-size: 16px;
                line-height: 18px;
                margin-left: 0;
            }
        }
        // 支付结果
        .payresult{
            width: 336px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content:center;
            button{
                width: 112px;
                height: 30px;
                border: 1px solid #90d0d4;
                color: #90d0d4;
                background:#fff;
                border-radius: 5px;
                font-size: 14px;
            }
        }
        // 重新选择支付方式
        p{
            font-size: 12px;
            color: #90d0d4;
            margin-left: 60px;
            cursor: pointer;
        }
    }
    // 支付反馈框的样式
    .payBack{
        width: 450px;
        height: 280px;
        position: absolute;
        top: 500px;
        left: 800px;
        box-shadow: 3px 3px 2px #8d8d8d;
        // 顶部
        .topbox{
            width:450px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            line-height: 60px;
            >p{
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
            }
            >span{
                display: block;
                width: 30px;
                height: 30px;
                font-size: 20px;
                cursor: pointer;
                margin-right: 20px;
            }
        }
        // 第一个p标签
        .firp{
            font-size: 22px;
            margin-left: 40px;
            margin-top: 20px;
        }
        // 第二个p标签
        .secp{
            font-size: 16px;
            color: #666666;
            margin-left: 40px;
            margin-top: 12px;
            margin-bottom: 12px;
        }
        // 支付结果
        .payresult{
            width: 450px;
            height: 50px;
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            button{
                width: 150px;
                height: 42px;
                border: 1px solid #90d0d4;
                color: #90d0d4;
                background:#fff;
                border-radius: 10px;
                font-size: 17px;
            }
            // 左边按钮
            .firbtn{
                margin-left: 40px;
                margin-right: 10px;
            }
        }
        // 第三个p标签,重新选择支付方式
        .thip{
            font-size: 14px;
            color: #90d0d4;
            margin-left: 40px;
            cursor: pointer;
        }
    }
    
}
</style>