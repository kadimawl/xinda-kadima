<template>
<div class="">
    <!-- 已评价盒子 -->
    <div class="already" v-for="aleval in alevals" :key="aleval.id">
        <!-- 左边盒子 -->
        <div class="Nleft" >
            <div class="gslogo"><img :src="aleval.providerImg" alt=""></div>
            <div class="shangpin">
                <p class="name">{{aleval.providerName}}</p>
                <p class="information"><span class="spanf">服务单号：{{aleval.serviceNo}}</span><span>购买时间：{{aleval.buyTime}}</span></p>
                <p class="cont">购买内容：{{aleval.serviceInfo}}</p>
            </div>
        </div>
        <!-- 右边盒子 -->
        <div class="Nright">
            <button>已评价</button>
        </div>
    </div>
    <pageturn :total="tatal" :pagesize="pagesize" @pagevary="pagevary"></pageturn>
</div>
  
</template>

<script>
import pageturn from './pageturn'
import {mapActions,mapGetters} from 'vuex' 

export default {
    // 注：不确定已评价的status是多少，暂且默认为1
    created(){
        if(this.getName){//是否登录
            if(sessionStorage.getItem('userevalAl'+this.getName+'')){//缓存有,防止重复拉取
                var data=JSON.parse(sessionStorage.getItem('userevalAl'+this.getName+''));
                this.datashow(data);
            }else{
                var that=this;
                that.ajax.post('/xinda-api/service/judge/grid',{
                    start:that.pagenum,
                    limit:that.pagesize,
                    status:1	
                }).then(function(data){
                    console.log(data);
                    that.datashow(data);
                })
            }
        }
    },
    computed:{
        ...mapGetters(['getName']),
    },
    data() {
        return {
            alevals:[],
            pagenum:0,//
            pagesize:2,//
            tatal:'',//总条目
        };
    },
    components:{pageturn},
    methods:{
        // 自定义事件
        pagevary(msg){
            this.pagenum=msg*2;
        },
        // 拉取数据处理
        datashow(data){
            if(data.data.data){
                this.alevals=data.data.data;
                this.alevals.providerImg='http://115.182.107.203:8088/xinda/pic'+data.data.data.providerImg+'';
                this.alevals.buyTime=new Date(data.data.data.buyTime);
                sessionStorage.setItem('userevalAl'+this.getName+'',JSON.stringify(data));
            }
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.already{
    width: 900px;
    height: 154px;
    border: 1px solid #cccccc;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    .Nleft{
        height: 154px;
        width: 700px;
        display: flex;
        align-items: center;
        .gslogo{
            width: 100px;
            height: 100px;
            margin: 0 15px;
            border: 1px solid #e9e9e9;
        }
        .shangpin{
            line-height: 35px;
            .information{
                display: flex;
                span{
                    display: block;
                }
                .spanf{
                    margin-right: 30px;
                }
            }
          
        }
    }
    .Nright{
        width: 170px;
        height: 154px;
        text-align: center;
        line-height: 154px;
        button{
            width: 118px;
            height: 38px;
            border: 1px solid #2494d4;
            border-radius: 5px;
            color: #2494d4;
            background: #ffffff;
            font-size: 18px;
            cursor: pointer;
        }
    }
}



  
  
 
</style>
