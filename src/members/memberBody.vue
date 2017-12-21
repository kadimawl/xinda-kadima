<template>
  <div class="myorder" @click="myorderclick">
    <!-- 顶部标签 -->
    <div class="topname">
      <p>我的订单</p>
    </div>
    <!-- 订单号搜索框 -->
    <div class="search">
      <p>订单号：</p>
      <el-input v-model="inputcode" placeholder="请输入订单号搜索"></el-input>
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
            <div class="codetime"><p>订单号：{{list.businessNo}}</p><p>下单时间：{{list.createTime}}</p></div>
            <div class="codebody">
                <div>
                    <div class="all" v-for="serv in list.servitem" :key="serv.id">
                        <div>
                            <!-- 公司logo图片 接口数据无logo图片链接-->
                            <div><img :src="serv.smallImg" alt="公司logo"></div>
                            <p>{{serv.serviceName}}</p>
                        </div>
                        <!-- 单价 -->
                        <p>￥{{serv.unitPrice}}</p>
                        <!-- 数量 -->
                        <p>{{serv.buyNum}}</p>
                        <!-- 总价 -->
                        <div class="pcommon">
                            <p>￥{{serv.totalPrice}}</p>
                        </div>
                        <!-- 订单状态 -->
                        <div class="pcommon">
                            <p>{{serv.status}}</p>
                        </div>
                    </div> 
                </div>
                <!-- 操作按钮 -->
                <div>
                    <button @click="payfor(list.businessNo,list.status)">付款</button>
                    <p @click="remove(list.id)">删除订单</p>
                </div>
                
            </div>
        </div>    
    </div>
    <!-- 错误提示框 -->
    <div class="errorbox" v-if="errorshow"><p :style="{color:acolor}">{{error}}</p></div>
    <!-- 删除订单提示框 -->
    <div class="remove" v-if="conRemove" :style="{height:heights,width:widths}">
        <div class="removebox">
            <div><p>确认删除这个宝贝吗</p><span @click="cancel">&#10005</span></div>
            <div><button @click="confirm" class="confirm">确定</button><button @click="cancel" class="cancel">取消</button></div>
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
import pageturn from "./pageturn";
export default {
    // 拉取数据
    created(){
        this.msg='false';
        this.errorshow=false;
        console.log(window.innerWidth)
        console.log(window.innerWidth)
        // 未登录不拉取数据
        if(this.getName){
            this.getData(this.pagenum,this.pagesize,this.value1,this.value2,this.inputcode);
        }
    },
    watch:{
        pagenum(newpage,oldpage){
            this.getData(newpage,this.pagesize,this.value1,this.value2,this.inputcode);
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
            pagenum:0,//
            pagesize:2,//
            total:'',//总条目
            conRemove:true,//确认删除
            orderid:'',//订单id
            heights:window.innerWidth+'px',//
            widths:window.innerWidth+'px',//
        };
    },
    // // 处理ajax获取的business数据显示在页面
    businessshow(data) {
      if (data.data.data) {
        this.total = data.data.totalCount + "";
        var data = data.data.data;
        var datas = {};

        for (var key in data) {
          if (data[key].status == 1) {
            //关于订单状态
            data[key].status = "等待买家付款";
          } else if (data[key].status == 4) {
            data[key].status = "已完成";
          }
          var businessNo = data[key].businessNo;
          if (!datas[businessNo]) {
            datas[businessNo] = data[key];
            datas[businessNo].createTime = moment(data[key].createTime).format(
              "YYYY-MM-DD hh:mm:ss"
            );
          }
        }
        var orderNo = [];
        for (var key in datas) {
          orderNo.push(businessNo);
        }
        // console.log(datas.orderNo);
        this.ordercode = orderNo;
        this.lists = datas;
        // console.log('this.lists==',this.lists)
      }
    },
    components:{pageturn},
    methods:{
        ...mapActions(['setCode']),
        // 调用数据公共方法
        getData(start,limit,time1,time2,code){
            var that=this;
            that.ajax.post('/xinda-api/business-order/grid',that.qs.stringify({
                start:start,
                limit:limit,
                startTime:time1,
                endTime:time2,
                businessNo:code,
            })).then(function(data){
                // console.log('origin==',data);
                if(data.data.data.length){
                    that.businessshow(data);
                    // console.log('origin1==',data);
                }else{
                    that.msg=true;
                    that.sermsg='无结果';
                    that.list=[];
                }
            })
        },
        // 自定义事件
        pagevary(msg){
            this.pagenum=msg*this.pagesize;
            // console.log('msg==',this.pagenum);
        },
        // // 处理ajax获取的business数据显示在页面
        businessshow(data){
            if(data.data.data){
                //获取订单总数，传给翻页组件
                this.total=data.data.totalCount+'';
                // console.log('this.total==',this.total);
                var data=data.data.data;
                for(let i=0;i<data.length;i++){
                    data[i].createTime=moment(data[i].createTime).format('YYYY-MM-DD hh:mm:ss');
                    data[i].servitem=[];
                    var orderN=data[i].businessNo;
                    var that=this;
                    that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify({
                        businessNo:orderN,
                    })).then(function(servdata){
                        // console.log('servicedata==',servdata);
                        var servdata=servdata.data.data;
                        for(var key in servdata){
                            //关于订单状态
                            if( servdata[key].status==1){
                                 servdata[key].status='等待买家付款';
                            }else if( servdata[key].status==4){
                                 servdata[key].status='已完成';
                            }   
                            data[i].servitem.push(servdata[key]);
                        }
                    })
                }
                this.lists=data;
                // console.log('data==',data);
            }
        },
        
        // 转换为时间戳   
        revertT(times){
            return  Date.parse(new Date(times))/1000;
        },
        //页面点击
        myorderclick(){
            var that=this;
            if(this.errorshow==true||this.msg==true){
                setTimeout(function(){
                    that.errorshow=false;
                    that.msg=false;
                },4000)
            }
        },
        // 订单号搜索
        searchs:function(){
            if(this.inputcode==''&&this.value1==''&&this.value2==''){
                return;
            }else if(this.inputcode!=''){
                // 简单验证订单号
                if(/^S1\d{18}$/.test(this.inputcode)){
                    this.getData(this.pagenum,this.pagesize,this.value1,this.value2,this.inputcode);
                }else{
                    this.sermsg='请输入正确的订单号';
                    this.inputcode='';
                    this.msg='true';
                }
            }else{
                this.getData(this.pagenum,this.pagesize,this.value1,this.value2,this.inputcode);
            }
        },
        // 付款
        payfor:function(num,status){
            // console.log(num,status);
            if(status==1){
                this.$router.push({path:'/Order/orderdetail',query:{orderNo:num}});
            }
        },
        // 删除订单
        remove:function(code){
            this.conRemove=true;
            this.orderid=code;
            
        },
        // 隐藏删除订单提示框
        cancel(){
            this.conRemove=false;
        },
        // 确定删除
        confirm(){
            // 向后台发送删除请求
            var that=this;
            this.conRemove=false;
            that.ajax.post('/xinda-api/business-order/del',
            that.qs.stringify(({
                id:that.orderid,
            }))).then(function(data){
                console.log(data);
                // 成功后重新获取数据，重新存缓存
                if(data.data.status==1){
                    that.errorshow=true;//提示
                    that.error='删除成功';
                    that.acolor='#55a4dc';
                    location.reload();
                }else{
                    that.errorshow=true;//提示
                    that.error=data.data.msg;
                    that.acolor='#ff4745';
                }
            })
            this.orderid='';
        }


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
      width: 265px;
      height: 24px;
      border: 1px solid #b0b0b0;
    }
    .el-input {
      width: 220px;
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
    background: #f7f7f7;
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
  // 订单展示列表，主体部分
  .listshow {
    width: 940px;
    height: auto;
    // 获取订单盒子
    .innerbox {
      width: 100%;
      height: 140px;
      margin-bottom: 10px;
      // 订单编号与时间
      .codetime {
        width: 100%;
        height: 40px;
        display: flex;
        background: #f7f7f7;
        p {
          line-height: 30px;
          margin-left: 20px;
        }
      }
      // 订单主体
      .all {
        width: 940px;
        height: 100px;
        display: flex;
        // 名称、单价和数量
        > div:nth-child(1) {
          width: 580px;
          height: 100px;
          display: flex;
          border: 1px solid #f7f7f7;
          align-items: center;
          > div {
            width: 334px;
            height: 100px;
            display: flex;
            align-items: center;
            // 装logo的盒子
            > div {
              width: 70px;
              height: 70px;
              margin-left: 15px;
              margin-right: 15px;
            }
            // 公司名称的样式
            > p {
              width: 100px;
              height: 70px;
              line-height: 30px;
            }
          }
          > p {
            width: 110px;
            text-align: center;
            height: 100px;
            line-height: 100px;
            font-size: 18px;
          }
        }
        // 状态和总价
        > p {
          width: 140px;
          height: 100xp;
          line-height: 100px;
          text-align: center;
          color: #2393d3;
          border: 1px solid #f7f7f7;
          font-size: 18px;
        }
<<<<<<< HEAD
    }
    // 订单展示列表，主体部分
    .listshow{
        width: 940px;
        height: auto;
        // 获取订单盒子
        .innerbox{
            width: 100%;
            min-height: 140px;
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
            .codebody{
                width: 100%;
                min-height: 100px;
                display: flex;
                align-items: center;
                >div:nth-child(1){
                    width: 812px;
                    .all{
                        width: 100%;
                        height: 100px;
                        display: flex;
                        >div:nth-child(1){
                            width: 370px;
                            height: 100px;
                            display: flex;
                            border: 2px solid #f7f7f7;
                            align-items: center;
                            // 装logo的盒子
                            >div{
                                width: 70px;
                                height: 70px;
                                margin-left: 15px;
                                margin-right: 15px;
                                line-height: 70px;
                            }
                            // 公司名称的样式
                            >p{
                                width: 100px;
                                height: 70px;
                                line-height: 70px;
                            }
                        }
                        >p{ 
                            width: 110px;
                            text-align: center;
                            height: 100px;
                            line-height: 100px;
                            font-size: 18px;
                            border: 2px solid #f7f7f7;
                        }
                         // 状态和总价
                        .pcommon{
                            width: 140px;
                            height: 100px;
                            text-align: center;
                            border: 2px solid #f7f7f7;
                            p{
                                margin-top: 30px;
                                height: 40px;
                                color: #2393d3;
                                font-size: 18px;
                                line-height: 40px;
                            }
                        }
                    }
                }
                // 操作按钮
                >div:nth-child(2){
                    width: 120px;
                    height: 100%;
                    text-align: center;
                    border: 1px solid #f7f7f7;
                    button{
                        width: 60px;
                        height: 40%;
                        border: 1px solid #2693d4;
                        border-radius: 5px;
                        background: #fff;
                        color: #2693d4;
                        margin-top: 30%;
                        margin-bottom: 10px;
                        font-size: 18px;
                        cursor: pointer;
                    }
                    p{
                        color: #ff4649;
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    // 错误提示框
    .errorbox{
        width: 300px;
        height: 100px;
        position: absolute;
        left: 1250px;
        top:300px;
        text-align: center;
        line-height: 100px;
        background: #f7f7f7;
        z-index:10;
        p{
=======
        // 操作按钮
        > div:nth-child(4) {
          width: 120px;
          height: 100px;
          text-align: center;
          border: 1px solid #f7f7f7;
          button {
            width: 60px;
            height: 30px;
            border: 1px solid #2693d4;
            border-radius: 5px;
            background: #fff;
            color: #2693d4;
            margin-top: 20px;
            margin-bottom: 10px;
>>>>>>> 5c412a9eea3a9e28a6860a241283bfbe92afbff3
            font-size: 18px;
            cursor: pointer;
          }
          p {
            color: #ff4649;
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .errorbox {
    width: 300px;
    height: 100px;
    position: absolute;
    left: 1250px;
    top: 300px;
    text-align: center;
    line-height: 100px;
    background: #f7f7f7;
    z-index: 10;
    p {
      font-size: 18px;
    }
<<<<<<< HEAD
    // 删除订单提示框
    .remove{
        position: absolute;
        left: 0;
        top:0;
        opacity: 0.7;
        z-index: 5;
        background: #000;
        .removebox{
            width: 300px;
            height: 120px;
            background:#ffffff;
            margin: 350px auto;
            box-shadow: 3px 3px 2px #8d8d8d;
            z-index: 12;
            >div:first-child{
                width:100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                background: #e9e9e9;
                p{
                    line-height: 40px;
                    margin-left: 10px;
                }
                span{
                    margin-right: 10px;
                    margin-top: 2px;
                    font-size: 20px;
                }
            }
            >div:last-child{
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                button{
                    width: 65px;
                    height: 36px;
                    border-radius: 10px;
                }
                .confirm{
                    background: #2693d4;
                    margin-right: 10px;
                }
                .cancel{
                    background: #e9e9e9;
                }
            }
        }
    }

=======
  }
>>>>>>> 5c412a9eea3a9e28a6860a241283bfbe92afbff3
}
</style>
