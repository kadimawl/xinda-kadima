<template>
    <div class="waitpay">
        <!-- 微信扫码框 -->
        <div class="scanCode" v-if="wxbox">
            <div class="topbox"><p>微信支付</p><span @click="weixinstop">&#10005</span></div>
            <div class="scan"><img src="../../assets/index/weixinsaoma.png" alt=""><p>请使用微信扫一扫&nbsp进行扫码支付</p></div>
            <div class="payresult">
                <button @click="payR">已完成支付</button>&nbsp<button @click="payno">支付遇到问题</button>
            </div>
            <p @click="back">返回重新选择支付方式</p>
        </div>
        <!-- 支付跳转等待框，可跳转支付成功及失败页，也可重新选择支付方式 -->
        <div class="payBack" v-if="payback">
            <div class="topbox"><p>微信支付</p><span @click="paybackstop">&#10005</span></div>
            <p class="firp">请您在新打开的页面上完成订单付款</p>
            <p class="secp">根据您的支付完成情况，选择下步操作</p>
            <div class="payresult">
                <button @click="payR" class="firbtn">已完成支付</button>&nbsp<button @click="payno">支付遇到问题</button>
            </div>
            <p @click="back" class="thip">返回重新选择支付方式</p>
        </div>
        <!-- 提示框 -->
        <div class="tsbox" v-if="tsbox">
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>
// 引用vuex的数据
import {mapGetters} from 'vuex'
export default {
    created(){
       if(this.getRadio==1||this.getRadio==3){
           this.payback=true;
           return;
       }
       if(this.getRadio==2){
           this.wxbox=true;
           return;
       }
    },
    data() {
        return {
            wxbox:false,//控制微信扫码框的出现
            payback:false,//控制支付反馈框的出现
            tsbox:false,//控制提示框
            error:'',//提示框内容
        };
    },
    // 引用getRadio
    computed:{
        ...mapGetters(['getRadio'])
    },
    methods:{
        // 关闭微信扫码框
        weixinstop:function(){
            this.wxbox=false;
            this.tsbox=true;
            this.error='2秒后返回支付方式界面';
            setTimeout(function(){
                this.waitshow=false;
                // location.href='http://localhost:8080/#/Order';
            },2000)
        },
        paybackstop:function(){
            this.payback=false;
            this.tsbox=true;
            this.error='2秒后返回支付方式界面';
            setTimeout(function(){
                location.href='http://localhost:8080/#/Order';
            },2000)
        },
        // 重新返回支付方式
        back:function(){
            location.href='http://localhost:8080/#/Order';
        },
        //支付成功,要与返回的数据进行验证
        payR:function(){
            location.href='http://localhost:8080/#/order/success';
            // if(){//验证成功
            //     this.wxbox=false;
            // this.payback=false;
            //     loaction.href='http://localhost:8080/#/order/success';
            // }else{//验证失败
            //     this.wxbox=false;
            // this.payback=false;
            //     loaction.href='http://localhost:8080/#/order/failure'; 
            // }
        },
        // 支付失败
        payno:function(){
            location.href='http://localhost:8080/#/order/failure';
            // if(){//验证成功
            //     this.wxbox=false;
            // this.payback=false;
             //         location.href='http://localhost:8080/#/order/success';
            // }else{//验证失败
             //     this.wxbox=false;
            //      this.payback=false;
            //     loaction.href='http://localhost:8080/#/order/failure';
            // }
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
.waitpay{
    width: 1200px;
    margin: 0 auto;
    height: 700px;
    background-color: transparent;
    padding: 10px 20px;
    // 页面所有的p标签
    p{
        font-size: 18px;
        height: 30px;
        line-height: 30px;
    }
   
    // 错误提示盒子的样式
    .tsbox{
        width: 450px;
        height: 160px;
        position: absolute;
        top: 300px;
        left: 700px;
        box-shadow: 2px 2px 2px #8d8d8d;
        >p{
            width: 450px;
            height: 150px;
            color: #ff0000;
            font-weight: bold;
            font-size: 20px; 
            line-height: 150px;
            text-align: center;
        }
    }
    // 微信扫码框的样式
    .scanCode{
        width: 336px;
        height: 370px;
        position: absolute;
        top:200px;
        left: 700px;
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
        top: 200px;
        left: 700px;
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