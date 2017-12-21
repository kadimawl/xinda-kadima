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
var moment = require('moment');
export default {
    // 注：不确定已评价的status是多少，暂且默认为1
    created(){
        if(this.getName){//是否登录
            if(this.datas[this.pagenum]){
                this.alevals=this.datas.splice(this.pagenum,this.pagesize);
            }else{
                this.getData(this.pagenum,this.pagesize);
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
            datas:[],//所有data.data.data数据放入datas
        };
    },
    components:{pageturn},
    // 监听pagenum是否改变
    watch:{
        pagenum(newpage,oldpage){
            this.getData(newpage,this.pagesize);
        },
    },
    methods:{
        // 自定义事件
        pagevary(msg){
            this.pagenum=msg*this.pagesize;
        },
        // 获取数据
        getData(start,limit){
            var that=this;
            that.ajax.post('/xinda-api/service/judge/grid',{
                start:start,
                limit:limit,
                status:1	
            }).then(function(data){
                if(data.data.data.length){
                    that.datashow(data);
                }
                console.log(data);
            })
        },
        // 拉取数据处理
        datashow(data){
            if(data.data.data){
                var data=data.data.data;
                for(let i=this.pagenum;i<this.pagenum+this.pagesize;i++){
                    var dataindex=i-this.pagethum;
                    this.datas[i]=data[dataindex];
                    this.datas[i].providerImg='http://115.182.107.203:8088/xinda/pic'+data[dataindex].providerImg+'';
                    this.datas[i].buyTime=moment(data[dataindex].buyTime).format('YYYY-MM-DD hh:mm:ss');
                }
                this.total=data.data.totalCount;
                this.evals=this.datas.splice(this.pagenum,this.pagesize);
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
