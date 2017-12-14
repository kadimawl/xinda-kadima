<template>
<div class="myorder" @click="myorderclick">
    <!-- 顶部标签 -->
    <div class="topname">
      <p>我的订单</p>
    </div>
    <!-- 订单号搜索框 -->
    <div class="search">
        <p>订单号：</p><el-input v-model="inputcode"  placeholder="请输入订单号搜索"></el-input> <button @click="searchs">搜索</button>
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
        <div class="innerbox" v-for="list in lists" :key="list.businessNo">
            <div class="codetime"><p>订单号：{{list.businessNo}}</p><p>下单时间：{{list.createTime}}</p></div>
            <div class="all">
                <div>
                    <div>
                        <!-- 公司logo图片 接口数据无logo图片链接-->
                        <div><img :src="list.smallImg" alt=""></div>
                        <p>{{list.providerName}}</p>
                    </div>
                    <!-- 单价 -->
                    <p>￥{{list.unitPrice}}</p>
                    <!-- 数量 -->
                    <p>{{list.buyNum}}</p>
                </div>
                <!-- 总价 -->
                <p>￥{{list.totalPrice}}</p>
                <!-- 订单状态 -->
                <p>{{list.status}}</p>
                <!-- 操作按钮 -->
                <div>
                    <button @click="payfor(list.businessNo)">付款</button>
                    <p @click="remove(list.businessNo)">删除订单</p>
                </div>
            </div>
        </div>
    </div>
    <!-- 错误提示框 -->
    <div class="errorbox" v-if="errorshow"><p :style="{color:acolor}">{{error}}</p></div>
    <!-- 翻页组件 -->
    <pageturn></pageturn>
</div>
 
  
</template>

<script>
//功能就差一个翻页功能
// 引入模块
import {mapActions,mapGetters} from 'vuex' 
import pageturn from './pageturn'
export default {
    // 拉取数据
    created(){
        this.msg='false';
        this.errorshow=false;
        // 未登录不拉取数据
        if(this.getName){
             // 防止重复拉取
            if(sessionStorage.getItem('myorder'+this.getName+'')==null){//未拉取
                var that=this;
                that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify({
                    businessNo:1,
                    startTime:'2017-03-28',
                    endTime:'2017-03-28',
                    start:0,
                    limit:'2',
                })).then(function(data){
                    // console.log('data==',data);
                    that.pageshow(data);
                })
            }else{//已拉取
                var data=JSON.parse(sessionStorage.getItem('myorder'+this.getName+''));
                this.pageshow(data);
            }
        }
    },
    data() {
        return {
            value1:'',//时间输入框开始
            value2:'',//时间输入框结束
            inputcode:'',//订单编号输入
            msg:false,//控制提示框
            sermsg:'',//提示内容
            lists:[],//循环数组
            searchR:'s',//将搜索的索引赋给本变量
            errorshow:false,//控制错误框
            error:'',//错误提示
            acolor:'#ff4649',//错误提示的颜色
        };
    },
    computed:{
        ...mapGetters(['getName'])
    },
    components:{pageturn},
    methods:{
        ...mapActions(['setCode']),
        // 处理ajax获取的数据显示在页面
        pageshow(data){
            if(data.data.data){
                this.lists=data.data.data;
                for(let i=0;i<this.lists.length;i++){
                    this.lists[i].createTime=new Date(data.data.data[i].createTime);
                    if(this.lists[i].status==1){//关于订单状态的code纯属猜测
                        this.lists[i].status='等待买家付款';
                    }else if(this.lists[i].status==2){
                        this.lists[i].status='已完成';
                    }
                }
                sessionStorage.setItem('myorder'+this.getName+'',JSON.stringify(data));
            }
        },
        // 转换为时间戳   
        revertT(times){
            return  Date.parse(new Date(times))/1000;
        },
        //页面点击
        myorderclick(){
            var that=this;
            setTimeout(function(){
                that.errorshow=false;
                that.msg='false';
            },4000)
        },
        // 订单号搜索
        searchs:function(){
            if(this.inputcode==''){
                return;
            }else{
                // 简单验证订单号
                if(/^S1\d{18}$/.test(this.inputcode)==true){
                    var data=JSON.parse(sessionStorage.getItem('myorder'+this.getName+''));
                    // 去获取的数据里搜索订单编号
                    for(let i=0;i<data.data.data.length;i++){
                        if(data.data.data[i].businessNo==this.inputcode){
                            this.searchR=i;
                        }
                    }
                    if(this.searchR=='f'){ // 处理未找到的情况
                        this.lists=[];
                        this.sermsg='没有找到该订单号';
                        this.msg='true';
                        return;
                    }else{//找到
                        // 根据时间来搜索
                        if(this.value1==''&&this.value2==''){//无时间
                            this.lists=data.data.data[this.searchR];
                            this.sermsg='找到了';
                            this.msg='true';
                            return;
                        }else if(this.value1!=''&&this.value2!=''){//都有时间
                            var newtstart=this.revertT(this.value1);
                            var newtend=this.revertT(this.value2);
                            // 左右时间框大小颠倒会报错
                            if( newtstart>=newtend){
                                this.sermsg='时间输入有误';
                                this.msg='true';
                                return;
                            }else{
                                var newtorder=data.data.data[this.searchR].createTime;
                                if(newtstart<=newtorder&&newt3<=newtend){ // 找到订单的时间在 两输入框之间
                                    this.lists=data.data.data[this.searchR];
                                    this.sermsg='找到了';
                                    this.msg='true';
                                    return;
                                }else{// 找到订单的时间不在 两输入框之间
                                    this.lists=[];
                                    this.sermsg='没有找到该订单号';
                                    this.msg='true';
                                    return;
                                }    
                            }
                        }else{//有一个是空
                            var newtorder=data.data.data[this.searchR].createTime;
                            if(this.value1==''&&this.value2!=''){
                                var newtend=this.revertT(this.value2);
                                if(newtorder<=newtend){
                                    this.lists=data.data.data[this.searchR];
                                    this.sermsg='找到了';
                                    this.msg='true';
                                    return;
                                }else{
                                    this.lists=[];
                                    this.sermsg='没有找到该订单号';
                                    this.msg='true';
                                    return;
                                }
                                return;
                            }
                            if(this.value1!=''&&this.value2==''){
                                var newtstart=this.revertT(this.value1);
                                if(newtorder>=newtstart){
                                    this.lists=data.data.data[this.searchR];
                                    this.sermsg='找到了';
                                    this.msg='true';
                                    return;
                                }else{
                                    this.lists=[];
                                    this.sermsg='没有找到该订单号';
                                    this.msg='true';
                                    return;
                                }
                                return;
                            }
                        }
                    }
                }else{
                    this.sermsg='请输入正确的订单号';
                    this.msg='true';
                    return;
                }
            }
        },
        // 付款
        payfor:function(num){
            this.setCode(num)
            location.href='http://localhost:8080/#/order';
        },
        // 删除订单
        remove:function(code){
            // 向后台发送删除请求
            var that=this;
            that.ajax.post('/xinda-api/business-order/del',
            that.qs.stringify(({
                id:code
            }))).then(function(data){
                // console.log(data);
                // 成功后重新获取数据，重新存缓存
                if(data.data.status==1){
                    that.errorshow=true;//提示
                    that.error='删除成功';
                    that.acolor='#55a4dc';
                    that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify({
                        businessNo:1,
                        startTime:'2017-03-28',
                        endTime:'2017-03-28',
                        start:0,
                        limit:'2',
                    })).then(function(data){
                        if(data.data.status==1){
                             // console.log('data==',data);
                            that.pageshow(data);
                        }else{
                            that.errorshow=true;//提示
                            that.error='更新失败';
                            that.acolor='#ff4745';
                        }
                    })
                }else{
                    that.errorshow=true;//提示
                    this.error=data.data.msg;
                    this.acolor='#ff4745';
                }
            })
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
.myorder{
    width: 970px;
    height: 660px;
    margin-left: 30px;
    margin-top: 30px;
    display: block;
    flex-direction: column;
    // 顶部标签
    .topname{
        width: 90%;
        height: 32px;
        border-bottom: 2px solid #e9e9e9;
        text-align: center;
        margin-bottom: 16px;
        p{
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
    .search{
        height: 40px;
        line-height: 40px;
        display: flex;
        margin-top:25px;
        span{
            display: block;
            margin-left: 40px;
            color:#e42b12;
        }
        p{
            width: 80px;
            color: #888888;
            margin-right: 20px;
        }
        input{
            width: 265px;
            height: 24px;
            border: 1px solid #b0b0b0;
        }
        .el-input{
            width: 220px;   
        }
        button{
            width: 72px;
            height: 26px;
            border: 1px solid #2693d4;
            border-radius: 4px;
            margin-left: 50px;
            margin-top: 6px;
            background: #ffffff;
            color: #66a9dd;
            box-shadow:0 0 1px 1px #66a9dd ;
        }
    }
    // 创建时间
    .time{
        height: 40px;
        display: flex;
        margin: 30px 0 30px 0;
        line-height:40px;
        p{
            color: #888888;
            margin-right: 20px;
        }
        .datepick1{
            margin-right: 20px;
        }
        .datepick2{
            margin-left: 20px;
        }
    }
    // 列表
    .list{
        display: flex;
        width: 932px;
        height: 32px;
        background: #f7f7f7;
        margin-bottom: 10px;
        p{
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            font-weight: bold;
        }
        .name{
            width: 320px;
            padding-left: 40px;
        }
        .unitprice{
            width: 110px;
            text-align: center;
        }
        .amount{
            width: 110px;
            text-align: center;
        }
        .sum{
            width: 142px;
            text-align: center;
        }
        .orderStatus{
            width: 142px;
            text-align: center;
        }
        .orderHandle{
            width: 120px;
            text-align: center;
        }
    }
    // 订单展示列表，主体部分
    .listshow{
        width: 940px;
        height: auto;
        // 获取订单盒子
        .innerbox{
            width: 100%;
            height: 140px;
            margin-bottom: 10px;
            // 订单编号与时间
            .codetime{
                width: 100%;
                height: 40px;
                display: flex;
                background: #f7f7f7;
                p{
                    line-height: 30px;
                    margin-left: 20px;
                }
            }
            // 订单主体
            .all{
                width: 940px;
                height: 100px;
                display: flex;
                // 名称、单价和数量
                >div:nth-child(1){
                    width: 580px;
                    height: 100px;
                    display: flex;
                    border: 1px solid #f7f7f7;
                    align-items: center;
                    >div{
                        width: 360px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        // 装logo的盒子
                        >div{
                            width: 70px;
                            height: 70px;
                            margin-left: 15px;
                            margin-right: 15px;
                        }
                        // 公司名称的样式
                        >p{
                            width: 100px;
                            height: 70px;
                            line-height: 30px;
                        }
                    }
                    >p{
                        text-align: center;
                    }
                }
                // 状态和总价
                >p{
                    width: 140px;
                    height: 100xp;
                    line-height: 100px;
                    text-align: center;
                    color: #2393d3;
                    border: 1px solid #f7f7f7;
                    font-size: 18px;
                }
                // 操作按钮
                >div:nth-child(4){
                    width: 120px;
                    height: 100px;
                    text-align: center;
                    border: 1px solid #f7f7f7;
                    button{
                        width: 60px;
                        height: 30px;
                        border: 1px solid #2693d4;
                        border-radius: 5px;
                        background: #fff;
                        color: #2693d4;
                        margin-top: 20px;
                        margin-bottom: 10px;
                        font-size: 18px;
                    }
                    p{
                        color: #ff4649;
                        font-size: 18px;
                    }
                }
            }
        }
    }
    .errorbox{
        width: 200px;
        height: 100px;
        position: fixed;
        left: 800px;
        top:300px;
        text-align: center;
        line-height: 100px;
        background: #f7f7f7;
        z-index:10;
        p{
            font-size: 18px;
        }
    }
}
</style>
