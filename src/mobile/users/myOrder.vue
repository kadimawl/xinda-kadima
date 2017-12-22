<template>
    <div class="box">
        <div class="aTop">
            <span></span>
            <p>我的订单</p>
        </div>
        <div class="aBody">
            <div class="order" v-for="list in lists" :key="list.businessNo">
                <div>
                    <p>订单号：{{list.businessNo}}</p>
                    <p>{{list.status}}</p>
                </div>
                <div v-for="serv in list.servitem" :key="serv.id">
                    <div><p>{{serv.providerName}}</p></div>
                    <div>
                        <div><img :src="serv.smallImg" alt="公司logo"></div>
                        <div>
                            <p>{{serv.serviceName}}</p>
                            <p>下单时间：{{serv.createTime}}</p>
                            <div>
                                <p><span>￥{{serv.unitPrice}}</span>元</p>
                                <p>&#10005<span>{{serv.buyNum}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="list.status=='等待买家付款'">
                    <p>合计：<span>￥{{list.totalPrice}}</span></p><p>删除订单</p><button>付款</button>
                </div>
                <div v-if="list.status=='已付款'">
                    <p>合计：<span>￥{{list.totalPrice}}</span></p><p>交易完成</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var moment = require("moment");
export default {
    created(){
        // if(){
            this.getData(0,2);
        // }
    },
    data(){
        return{
            lists:[],//v-for循环数据包
            errorbox:false,//
            error:'',//
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
                console.log('origin==',data);
                if(data.data.data&&data.data.data.length){
                    that.businessshow(data);
                }else{
                    that.errorbox=true;
                    that.error='无结果';
                }
            })
        },
        businessshow(data){
            var data=data.data.data;
            for(let i=0;i<data.length;i++){
                // data[i].createTime=moment(data[i].createTime).format('YYYY-MM-DD hh:mm:ss');
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
                    console.log('servicedata==',servdata);
                    var servdata=servdata.data.data;
                    for(var key in servdata){
                        // 公司logo
                        // servdata[key].smallImg='http://115.182.107.203:8088/xinda/pic'+servdata[key].providerImg+'';
                        // 关于订单时间
                        servdata[key].createTime=moment(servdata[key].createTime).format('YYYY-MM-DD hh:mm:ss');
                        // 将服务订单信息添加到循环包里  
                        data[i].servitem.push(servdata[key]);
                    }
                })
            }
            this.lists=data;
        },
    },
};
</script>

<style lang="less" scoped>
// 大盒子
.box {
    width: 100%;
    max-width: 1280px;
    height: 1334px;
    margin: 0 auto;
    
}
// 顶部标签
.aTop {
    width: 100%;
    height: 0.8rem;
    background: #e5e5e5;
    font-size: 28px;
    color: #000;
    display: flex;
    align-items: center;
    >span {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        background-color: #fff;
        background: url(../../assets/mobile/mobileS.png) -12px -8px;
        margin-left: 0.3rem;
        cursor: pointer;
    }
    >p{
        width: 80%;
        text-align: center;
        line-height: 0.75rem;
        letter-spacing: 5px;
    }
}
// 订单部分
.aBody{
    width: 100%;
    background: #f8f8f8;
    .order{
        width: 100%;
        margin-top: 0.2rem;
        >div:first-child{
            width: 100%;
            height: 0.7rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p:first-child{
                margin-left: 0.35rem;
                color:#a3a3a3;
            }
        }
    }
    
}

</style>
