<template>
<div class="">
    <!-- 未评价的项目 -->
    <div class="evalNone" v-for="usereval in evals" :key="usereval.id">
        <div class="Nleft">
            <!-- 用户logo -->
            <div class="gslogo"><img :src="usereval.providerImg" alt=""></div>
            <div class="shangpin">
                <p class="name">{{usereval.providerName}}</p>
                <p class="information"><span class="spanf">服务单号：{{usereval.serviceNo}}</span><span>购买时间：{{usereval.buyTime}}</span></p>
                <p class="cont">购买内容：{{usereval.serviceInfo}}</p>
            </div>
        </div>
        <div class="Nright">
            <router-link :to="{path:'/member/userEval/gotoeval'}" tag="button" class="gotoeval" @click="gotoEval">去评价</router-link>
        </div>
    </div>
    <pageturn :total="tatal" :pagesize="pagesize" @pagevary="pagevary"></pageturn>
</div>
  
</template>

<script>
import pageturn from './pageturn'
import {mapActions,mapGetters} from 'vuex' 
export default {
    created(){
        if(this.getName){//是否登录
            if(sessionStorage.getItem('userevalno'+this.getName+''+this.pagenum+'')){//缓存有,防止重复拉取
                var data=JSON.parse(sessionStorage.getItem('userevalno'+this.getName+''+his.pagenum+''));
                this.datashow(data);
            }else{
                var that=this;
                that.ajax.post('/xinda-api/service/judge/grid',{
                    start:that.pagenum,
                    limit:that.pagesize,
                    status:2	
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
            evals:[],
            pagenum:0,//
            pagesize:2,//
            tatal:'',//总条目
        };
    },
    components:{pageturn},
    methods:{
        ...mapActions(['setEvaldetail']),
        // 自定义事件
        pagevary(msg){
            this.pagenum=msg*2;
        },
        // 拉取数据处理
        datashow(data){
            if(data.data.data){
                this.total=data.data.totalCount;
                this.evals=data.data.data;
                this.evals.providerImg='http://115.182.107.203:8088/xinda/pic'+data.data.data.providerImg+'';
                this.evals.buyTime=new Date(data.data.data.buyTime);
                sessionStorage.setItem('userevalno'+this.getName+''+his.pagenum+'',JSON.stringify(data));
            }
        },
        // 去评价点击,传参
        gotoEval(){
            var data=JSON.parse(sessionStorage.getItem('userevalno'+this.getName+''+his.pagenum+''));
            this.setEvaldetail({codes:data.data.data.serviceNo,conts:data.data.data.serviceInfo,btimes:data.data.data.buyTime});
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
