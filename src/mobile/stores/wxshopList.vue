<template>
    <div class="wxshoplist">
        <!-- 顶部 -->
        <div class="topbtn">
            <div>
               <p :class="{'active':top==1}" @click="acquiesce">默认排序</p>
               <p :class="{'active':top==2}" @click="goodjudge">好评率排序</p>
               <p :class="{'active':top==3}"  @click="xiaoliang">销量</p>
            </div>
        </div>
        <!-- 店铺列表 -->
        <div class="stores" v-for="shop in shops" :key="shop.id" @click="shopclick(shop.id)">
            <div><img :src="shop.providerImg" alt="店铺logo"></div>
            <div>
                <p>{{shop.providerName}}</p>
                <div><span><img src="../../assets/mobile/addIcon.jpg" alt=""></span><p>{{shop.regionName}}</p></div>
                <div>
                    <p>累计客户数量：<span>{{shop.orderNum}}</span></p>
                    <p>好评率：<span>{{shop.goodJudge}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.getData(this.limit,this.productTypeCode,this.region,this.sort);
    },
    data(){
        return{
            shops:[],//
            sort:'1',//
            region:'',//
            productTypeCode:'',//
            top:1,//
            limit:'',//
        };
    },
    components: {},
    methods:{
        // 获取数据
        getData(limit,productTypeCode,region,sort){
            var that=this;
            that.ajax.post('/xinda-api/provider/grid',that.qs.stringify({
                start:0,
                limit:limit,
                productTypeCode:productTypeCode,
                regionId:region,
                sort:sort,
            })).then(function(data){
                if(data.data.data.length){
                    that.datahandle(data);
                }
            })
        },
        // 处理数据
        datahandle(data){
            var data=data.data.data;
            for(let i=0;i<data.length;i++){
                data[i].providerImg='http://115.182.107.203:8088/xinda/pic'+data[i].providerImg+'';
                data[i].regionName=data[i].regionName.substr(3).replace(/-/g,'  ');
                if(data[i].totalJudge==0){
                    data[i].goodJudge='暂无评价';
                }else{
                    data[i].goodJudge=data[i].goodJudge/data[i].totalJudge*100+'%';
                }
            }
            this.shops=data;
        },
        // 点击跳转店铺首页
        shopclick(id){
            this.$router.push({path:'/m/store/Home',query:{storeId:id}});
        },
        // 默认排序
        acquiesce(){
            if(this.top!=1){
                this.top=1;
                this.sort=1;
                this.getData(this.limit,this.productTypeCode,this.region,this.sort);
            }
        },
        // 好评率排序
        goodjudge(){
            if(this.top!=2){
                this.top=2;
                this.sort=2;
                this.getData(this.limit,this.productTypeCode,this.region,this.sort);
            }
        },
        // 销量排序
        xiaoliang(){
            if(this.top!=3){
                this.top=3;
                this.sort=3;
                this.getData(this.limit,this.productTypeCode,this.region,this.sort);
            }
        },
    },

}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.wxshoplist{
    width: 100%;
    margin: 0 auto;
    // 顶部
    .topbtn{
        width: 100%;
        height: 0.64rem;
        margin: 0.42rem 0;
        text-align: center;
        >div{
            width: 60%;
            height: 0.64rem;
            margin: 0 auto;
            border-radius: 0.1rem;
            border: 0.01rem solid #2693d4;
            display: flex;
            >p{
                width: 33.3%;
                height: 0.64rem;
                line-height: 0.64rem;
                font-size: 0.26rem;
            }
            >p:first-child{
                border-right:0.01rem solid #2693d4;
            }
            >p:last-child{
                border-left:0.01rem solid #2693d4;
            }
        }
    }
    // 顶部标签被选中
    .active{
        background: #2693d4;
        color: #fff;
    }
    // 店铺列表
    .stores{
        width: 100%;
        height: 1.7rem;
        font-size: 0.2rem;
        padding: 0.22rem 0;
        border-bottom: 0.01rem solid #cfcfcf;
        display: flex;
        align-items: center;
        // 店铺logo
        >div:first-child{
            width: 1.7rem;
            height: 1.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin:0 0.16rem;
            border: 0.01rem solid #cfcfcf;
            margin-right: 0.3rem;
            img{
                width: 95%;
                height: 70%;
            }
        }
        // 店铺信息
        >div:last-child{
            width: 70%;
            height: 1.7rem;
            >p{
                font-size: 0.3rem;
            }
            // 地址
            >div:nth-child(2){
                margin-top: 0.2rem;
                display: flex;
                span{
                    width: 0.3rem;
                    height: 0.4rem;
                    margin-right: 0.2rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                >p{
                    font-size: 0.24rem;
                }
            }
            // 好评率
            >div:last-child{
                display: flex;
                margin-top: 0.3rem;
                p{
                    font-size: 0.24rem;
                    span{
                        color: #ff6668;
                    }
                }
                >p:first-child{
                    margin-right: 0.2rem;
                }
            }
        }
    }
}
</style>
