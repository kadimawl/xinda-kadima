<template>
    <div class="box" @click="myclick">
         <!-- 错误提示框，所有的错误提示都在这里 -->
        <div class="errorbox" v-if="errorbox" :style="{color:acolor}">
            <div>{{error}}</div>
        </div>
        <!-- 订单部分 -->
        <div class="aBody">
            <div class="order" v-for="list in lists" :key="list.businessNo">
                <div>
                    <p>订单号：{{list.businessNo}}</p>
                    <p>{{list.status}}</p>
                </div>
                <div v-for="serv in list.servitem" :key="serv.id" class="servbox">
                    <div><p>{{serv.providerName}}</p></div>
                    <div>
                        <div><img src="../../assets/icon.png" alt="公司logo"></div>
                        <div>
                            <p>{{serv.serviceName}}</p>
                            <p>下单时间：{{serv.createTime}}</p>
                            <div>
                                <p><span>￥{{serv.unitPrice}}</span>元</p>
                                <p>X<span>{{serv.buyNum}}</span></p>
                            </div>                                                                                                                                                                                                                                                                       
                        </div>
                    </div>
                </div>
                <div v-if="list.status=='等待买家付款'" class="waitpay">
                    <p>合计：<span>￥{{list.totalPrice}}</span></p><p @click="remove(list.id)">删除订单</p><button @click="payfor(list.businessNo)">付款</button>
                </div>
                <div v-if="list.status=='已付款'" class="payalready">
                    <p>合计：<span>￥{{list.totalPrice}}</span></p><p>交易完成</p>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
var moment = require("moment");
import { MessageBox } from "mint-ui";
export default {
    created(){                                                                                         
            this.getData(0,this.limit);
    },
    components:{},
    data(){
        return{
            lists:[],//v-for循环数据包
            errorbox:false,//
            error:'',//
            acolor:'#ff4649',//
            limit:'',//
        };
    },
    methods:{
        // 获取数据方法
        getData(start,limit){
            var that=this;
            that.ajax.post('/xinda-api/business-order/grid',that.qs.stringify({
                start:start,
                limit:limit,
            })).then(function(data){
                if(data.data.data&&data.data.data.length){
                    that.businessshow(data);
                }else{
                    that.errorbox=true;
                    that.error='无结果';
                }
            })
        },
        // 处理获取数据
        businessshow(data){
            var data=data.data.data;
            for(let i=0;i<data.length;i++){
                data[i].servitem=[];
                var orderN=data[i].businessNo;
                //关于订单状态
                if(data[i].status==1){
                    data[i].status='等待买家付款';
                }else if(data[i].status==4){
                    data[i].status='已付款';
                }
                var that=this;
                that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify({
                    businessNo:orderN,
                })).then(function(servdata){
                    var servdata=servdata.data.data;
                    for(var key in servdata){
                        // 关于订单时间
                        servdata[key].createTime=moment(servdata[key].createTime).format('YYYY-MM-DD HH:mm:ss');
                        // 将服务订单信息添加到循环包里  
                        data[i].servitem.push(servdata[key]);
                    }
                })
            }
            this.lists=data;
        },
        // 删除订单
        remove(id){
            var that = this;
            MessageBox.confirm('亲，确定要删除这个订单吗?').then(action => {
                var that=this;
                that.ajax.post('/xinda-api/business-order/del',
                that.qs.stringify(({
                    id:id,
                }))).then(function(data){
                    // 成功后重新获取数据，重新存缓存
                    if(data.data.status==1){
                    }else{
                        that.errorbox=true;//提示
                        that.error=data.data.msg;
                        that.acolor='#ff4745';
                    }
                })
            }).catch(() => {});
        },
        // 页面点击事件
        myclick(){
            var that=this;
            if(this.errorbox==true){
                setTimeout(function(){
                    that.errorbox=false;
                    that.acolor='#ff4745';
                },3000)
            }
        },
        //付款
        payfor(code){
            this.$router.push({path:'',query:{businessNo:code}})
        },
    },
};
</script>

<style lang="less" scoped>
// 大盒子
.box {
    width: 100%;
    margin: 0 auto;
    background: #f8f8f8;
}
// 订单部分
.aBody{
    font-size: 0.18rem;
    width: 100%;
    background: #f8f8f8;
    .order{
        width: 100%;
        margin-bottom: 0.28rem;
        // 顶部订单号
        >div:first-child{
            width: 100%;
            height: 0.72rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            p{
                font-size: 0.22rem;
            }
            p:first-child{
                margin-left: 0.16rem;
                color:#a3a3a3;
            }
            p:last-child{
                margin-right: 0.32rem;
            }
        }
        // 服务内容循环盒子
        .servbox{
            width: 100%;
            height: 2.62rem;
            background: #f8f8f8;
            // 公司名称
            >div:first-child{
                width: 100%;
                height: 0.46rem;
                line-height: 0.46rem;
                p{
                    margin-left: 0.16rem;
                    font-size: 0.2rem; 
                }
            }
            // 服务订单主体
            >div:nth-child(2){
                width: 100%;
                height: 2.17rem;
                display: flex;
                // 公司logo
                >div:first-child{
                    width: 1.7rem;
                    height: 1.7rem;
                    margin: 0 0.15rem;
                    text-align: center;
                    padding: .15rem;
                    box-sizing: border-box;
                    border:0.01rem solid #e3e3e3;
                    img{
                        display: block;
                        width: 1.4rem;
                        height: 1.4rem;
                    }
                }
                // 订单详情
                >div:last-child{
                    width: 73%;
                    height: 2.17rem;
                    display: flex;
                    flex-direction: column;
                    // 服务内容
                    >p:first-child{
                        font-size: 0.28rem;
                        color: #000;
                    }
                    // 创建时间
                    >p:nth-child(2){
                        font-size: 0.24rem;
                        margin-top: 0.16rem;
                    }
                    // 数量和单价
                    >div:last-child{
                        display: flex;
                        margin-top: 0.48rem;
                        // 单价
                        >p:first-child{
                            font-size: 0.15rem;
                            margin-right: 0.34rem;
                            >span{
                                font-size: 0.25rem;
                                color: #fe1614;
                                padding-right: 0.16rem;
                            }
                        }
                        // 数量
                        >p:last-child{
                            font-size: 0.13rem;
                            >span{
                                font-size: 0.25rem;
                                padding-left: 0.05rem;
                            }
                        }
                    }
                }
            }
           
        }
        // 等待买家付款的底部
        .waitpay{
            width: 100%;
            height: 0.77rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            p{
                font-size: 0.24rem;
            }
            // 合计
            >p:first-child{
                margin-left: 0.2rem;
                span{
                    color: #fd6766;
                }
            }
            // 删除订单
            >p:nth-child(2){
                color: #fd6766;
                margin-left: 1.2rem;
            }
            // 付款按钮
            >button{
                width: 1.23rem;
                height: 0.48rem;
                background: #2693d4;
                color: #ebf4f9;
                font-size: 0.24rem;
                margin-right: 0.5rem;
            }
        }
        // 已付款的底部
        .payalready{
            width: 100%;
            height: 0.77rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            p{
                font-size: 0.24rem;
            }
            // 合计
            >p:first-child{
                margin-left: 0.2rem;
                span{
                    color: #fd6766;
                }
            }
            // 交易完成
            >p:last-child{
                color: #5c5c5c;
                margin-right: 0.49rem;
            }
        }
    }
}
//错误提示框
.errorbox{
    width: 100%;
    height: 0.6rem;
    font-size: 0.2rem;
    z-index: 4;
    >div{
        width: 3rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        margin: 0 auto;
    }
}


</style>
