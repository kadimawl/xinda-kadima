<template>
    <div class="waitpay" v-if="displays" :style="{height:heights,width:widths}">
        <!-- 微信扫码框 -->
        <div class="scanCode boxstyle" v-if="type==2">
            <div class="topbox">
                <p>微信支付</p>
                <!-- <span @click="weixinstop">&#10005</span> -->
            </div>
            <div class="scan"><img src="../../assets/index/weixinsaoma.png" alt="">
                <p>请使用微信扫一扫  进行扫码支付</p>
            </div>
            <div class="payresult">
                <button @click="payR" class="firbtn">已完成支付</button>
                <button @click="payno">支付遇到问题</button>
            </div>
            <!-- <p @click="back">返回重新选择支付方式</p> -->
        </div>
        <!-- 支付跳转等待框，可跳转支付成功及失败页，也可重新选择支付方式 -->
        <div class="payBack boxstyle" v-if="type==1||type==3">
            <div class="topbox">
                <p>支付反馈</p>
                <!-- <span @click="paybackstop">&#10005</span> -->
            </div>
            <p class="firp">请您在新打开的页面上完成订单付款</p>
            <p class="secp">根据您的支付完成情况，选择下步操作</p>
            <div class="payresult">
                <button @click="payR" class="firbtn">已完成支付</button>
                <button @click="payno">支付遇到问题</button>
            </div>
            <!-- <p @click="back" class="thip">返回重新选择支付方式</p> -->
        </div>
        <!-- 提示框 -->
        <div class="tsbox boxstyle" v-if="errorbox">
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>
export default {
    // 父组件向子组件传参
    props:{
        displays:Boolean,
        type:String,
        code:String,
    },
    data() {
        return {
            error: "", //提示框内容
            heights:window.innerWidth+'px',//
            widths:window.innerWidth+'px',//
            errorbox:false,//
        };
    },
    created() {
        var id = this.$route.query.orderNo;
    },
    computed: {
    },
    methods: {
        // 确认支付方法
        confirmPay(code){
            var that=this;
            that.ajax.post('/xinda-api/business-order/detail',
            that.qs.stringify({
                businessNo:code, 
            })).then(function(data){
                if(data.data.data.businessOrder.status==1){
                    that.errorbox=true;
                    that.error='正在获取支付结果，请稍后';
                    that.type='';
                    setTimeout(function(){
                        that.$router.push({path:'/order/failure',query:{id: that.$route.query.orderNo}});
                    },3000)
                }else{
                    that.errorbox=true;
                    that.error='正在获取支付结果，请稍后';
                    that.type='';
                    setTimeout(function(){
                        that.$router.push({path:'/order/success',query:{id: that.$route.query.orderNo}});
                    },3000)
                }
            })
        },
        //支付成功,要与返回的数据进行验证
        payR: function() {
            this.confirmPay(this.code);
        },
        // 支付失败
        payno: function() {
            this.confirmPay(this.code);
        }
    }
};
</script>

<style scoped lang='less'>
* {
    margin: 0;
    padding: 0;
}
.waitpay {
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.8;
    padding: 10px 20px;
    // 页面所有的p标签
    p {
        font-size: 18px;
        height: 30px;
        line-height: 30px;
    }
    // 错误提示盒子的样式
    .tsbox {
        width: 450px;
        height: 160px;
        background: #fff;
        box-shadow: 2px 2px 2px #8d8d8d;
        > p {
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
    .scanCode {
        width: 336px;
        height: 370px;
        background: #fff;
        box-shadow: 3px 3px 2px #8d8d8d;
        // 顶部
        .topbox {
            width: 336px;
            height: 45px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            line-height: 45px;
             border-radius: 10px;
            >p{
                height: 45px;
                line-height: 45px;
                margin-left: 20px;
               
            }
        }
        // 二维码
        .scan {
            width: 336px;
            height: 230px;
            text-align: center;
            img {
                padding-top: 14px;
            }
            > p {
                height: 18px;
                font-size: 16px;
                line-height: 18px;
                margin-left: 0;
            }
        }
        // 支付结果
        .payresult {
            width: 336px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            button {
                width: 112px;
                height: 30px;
                border: 1px solid #90d0d4;
                color: #90d0d4;
                background: #fff;
                border-radius: 5px;
                font-size: 14px;
            }
            }
            
    }
    // 支付反馈框的样式
    .payBack {
        width: 450px;
        height: 280px;
        background: #fff;
        box-shadow: 3px 3px 2px #8d8d8d;
        // 顶部
        .topbox {
            width: 450px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            line-height: 60px;
             border-radius: 10px;
            > p {
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
            }
        }
        // 第一个p标签
        .firp {
            font-size: 22px;
            margin-left: 40px;
            margin-top: 20px;
        }
        // 第二个p标签
        .secp {
            font-size: 16px;
            color: #666666;
            margin-left: 40px;
            margin-top: 12px;
            margin-bottom: 12px;
        }
        // 支付结果
        .payresult {
            width: 450px;
            height: 50px;
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            button {
                width: 150px;
                height: 42px;
                border: 1px solid #90d0d4;
                color: #90d0d4;
                background: #fff;
                border-radius: 10px;
                font-size: 17px;
            }
            // 左边按钮
            .firbtn {
                margin-left: 40px;
            }
        }
    }
    .firbtn{
        margin-right: 20px;
    }
    // 所有大盒子通用样式
    .boxstyle{
        position: fixed;
        top: 40%;
        left: 40%;
        border-radius: 10px;
    }   
}
</style>