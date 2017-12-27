<template>
<div class="">
    <!-- 未评价的项目 -->
    <div class="evalNone" v-for="(usereval,index) in evals" :key="usereval.index">
        <div class="Nleft">
            <!-- 用户logo -->
            <div class="gslogo"><img :src="usereval.providerImg" alt="商品logo"></div>
            <div class="shangpin">
                <p class="name">{{usereval.providerName}}</p>
                <p class="information"><span class="spanf">服务单号：{{usereval.serviceNo}}</span><span>购买时间：{{usereval.buyTime}}</span></p>
                <p class="cont">购买内容：{{usereval.serviceInfo}}</p>
            </div>
        </div>
        <div class="Nright">
            <router-link :to="{path:'/member/userEval/gotoeval'}" tag="button" class="gotoeval" @click="gotoEval(index)">去评价</router-link>
        </div>
    </div>
    <pageturn :total="tatal" :pagesize="pagesize" @pagevary="pagevary"></pageturn>
</div>
  
</template>

<script>
// 思路如下，ajax拉取数据，把数据处理，存入datas这个数组，evals得到截取值。根据页数拉取，分位置存入datas。
import pageturn from './pageturn'
import {mapActions,mapGetters} from 'vuex' 
var moment = require('moment');
export default {
    created(){
        if(this.getName){//是否登录
            if(!this.datas[this.pagenum]){
                this.getData(this.pagenum,this.pagesize);
            }else{
                this.evals=this.datas.splice(this.pagenum,this.pagesize);
            }
        }
    },
    computed:{
        ...mapGetters(['getName']),
    },
    data() {
        return {
            evals:[],
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
        ...mapActions(['setEvaldetail']),
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
                status:2	
            }).then(function(data){
                if(data.data.data&&data.data.data.length){
                    that.datashow(data);
                }
                // console.log(data);
            })
        },
        // 拉取数据处理
        datashow(data){
            var data=data.data.data;
            for(let i=this.pagenum;i<this.pagenum+this.pagesize;i++){
                var dataindex=i-this.pagethum;
                this.datas[i]=data[dataindex];
                this.datas[i].providerImg='http://115.182.107.203:8088/xinda/pic'+data[dataindex].providerImg+'';
                this.datas[i].buyTime=moment(data[dataindex].buyTime).format('YYYY-MM-DD hh:mm:ss');
            }
            this.total=data.data.totalCount;
            this.evals=this.datas.splice(this.pagenum,this.pagesize);
        },
        // 去评价点击,传参
        gotoEval(index){
            this.setEvaldetail({codes:this.datas[index].serviceNo,conts:this.datas[index].serviceInfo,btimes:this.datas[index].buyTime});
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
// 未评价盒子
.evalNone{
    width: 900px;
    height: 154px;
    border: 1px solid #cccccc;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    // 左边
    .Nleft{
        height: 154px;
        width: 700px;
        display: flex;
        align-items: center;
        // 公司logo
        .gslogo{
            width: 100px;
            height: 100px;
            margin: 0 15px;
            border: 1px solid #e9e9e9;
        }
        // 商品信息
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
    // 右边按钮
    .Nright{
        width: 170px;
        height: 154px;
        text-align: center;
        line-height: 154px;
        .gotoeval{
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
