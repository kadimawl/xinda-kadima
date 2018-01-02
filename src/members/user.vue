<template>
<div class="user">
    <p>首页&nbsp/&nbsp个人主页</p>
    <!-- 头像框，用户登录后会显示用户头像和name -->
    <div class="touxiang">
        <div><img src="../assets/index/user.png" alt="用户头像"></div>
        <p>{{getName}}</p>
    </div>
    <!-- 导航栏，控制  我的订单、用户评价和账户设置 的跳转 -->
    <div class="nav">
        <router-link :to="{path:'/member/memberBody'}"  class="myorder common" active-class="active"><span></span>我的订单</router-link>
        <router-link :to="{path:'/member/userEval'}"  class="usereval common" active-class="active"><span></span>用户评价</router-link>
        <router-link :to="{path:'/member/accountSet'}"  class="accountset common" active-class="active"><span></span>账户设置</router-link>
    </div>
</div>
  
</template>

<script>
// 引入vuex
import {mapGetters} from 'vuex'
export default {
    created(){
    },
    data() {
        return {
            headimg:this.getheadX,//
        }
    },
    computed:{
        ...mapGetters(['getheadX','getName']),
    },
    methods:{
    }
};
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}
.user{
    width: 250px;
    height: 480px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    // 头像框
    .touxiang{
        width: 240px;
        height: 145px;
        text-align: center;
        background: #e9e9e9;
        margin: 10px 5px;
        // 头像
        >div{
            margin-left: 70px;
            width: 90px;
            height: 90px;
            text-align: center;
            img{
                width: 60px;
                height: 60px;
                margin: auto;
                padding-top: 10px;
                vertical-align: middle;
            }
        }
        // 用户名
        >p{
            font-size: 20px;
            font-weight: bold;
        }
    }
    // 导航
    .nav{
        width: 240px;
        height: 380px;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
        margin: 0 5px;
        .common{
            width: 100%;
            height: 50px;
            display: flex;
            line-height: 50px;
            cursor: pointer;
            font-size: 20px;
            text-decoration: none;
            color:#000;
            span{
                display: block;
                width: 27px;
                height: 25px;
                margin: auto 0;
                margin-left: 55px;
                margin-right: 10px;
            }
        }
        .myorder{
            span{
                background: url('../assets/HomePageimages/Sprites.png') no-repeat;
                background-position: -102px -126px;
            }
        }
        .usereval{
            span{
                background: url('../assets/HomePageimages/Sprites.png') no-repeat;
                background-position: -104px -185px;
            }
        }
        .accountset{
            span{
                background: url('../assets/HomePageimages/Sprites.png') no-repeat;
                background-position: -99px -76px;
            }
        }
    }
    // 标签激活加的样式
    .active{
        background: #e9e9e9;
    }
}
</style>
