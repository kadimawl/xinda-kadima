<template>
    <div class="emptyshopcar">
        <el-row class="first"> 
            <el-col :span="18"><p class="top">购物车内共有<span>{{getwxNum}}</span>件商品</p></el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="12" ><div class="tupian"><img src="../../assets/mobile/gouwu.png" alt=""></div></el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="12" ><p class="tishi">购物车空空如也，去首页逛逛吧！</p></el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="12" ><button class="btn">去首页</button></el-col>
        </el-row>   

       <el-row><el-col ><div class=""></div></el-col></el-row>

    </div>
    
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{

        };
    },
    components: {},
    computed:{
        ...mapGetters(['getwxNum']),
    },
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.emptyshopcar{
    min-width: 320px;
    max-width: 768px;
    margin: 0 auto;
    min-height: 568px;
    max-height: 1280px;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    .top{//顶部
        padding: 5px 0 0 10px;
        color: #aaaca8;
        min-height: 25px;
        span{
            color: #fe7581;
        }
    }
    .tupian{
        min-width: 20%;
        margin-top: 30%;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
