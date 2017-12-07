<template>
<div class="user">
    <p>首页&nbsp/&nbsp个人主页</p>
    <!-- 头像框，用户登录后会显示用户头像和name -->
    <div class="touxiang">
        <img src="../assets/index/user.png" alt="用户头像">
        <p>{{userphone}}</p>
    </div>
    <!-- 导航栏，控制了我的订单、用户评价和账户设置 的跳转 -->
    <div class="nav">
        <router-link :to="{path:'/member/memberBody'}"  class="myorder common" active-class="active"><span></span>我的订单</router-link>
        <router-link :to="{path:'/member/userEval'}"  class="usereval common" active-class="active"><span></span>用户评价</router-link>
        <router-link :to="{path:'/member/accountSet'}"  class="accountset common" active-class="active"><span></span>账户设置</router-link>
    </div>
</div>
  
</template>

<script>
export default {
    data() {
        return {
            userphone:'13854285852',
        }
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
    .touxiang{
        width: 240px;
        height: 145px;
        text-align: center;
        background: #e9e9e9;
        margin: 10px 5px;
        img{
            padding-top: 10px;
        }
        p{
            font-size: 20px;
            font-weight: bold;
        }
    }
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
                background: url('../assets/index/memCen.png') no-repeat;
                background-position: -25px -125px;
            }
        }
        .usereval{
            span{
                background: url('../assets/index/memCen.png') no-repeat;
                background-position: -25px -157px;
            }
        }
        .accountset{
            span{
                background: url('../assets/index/memCen.png') no-repeat;
                background-position: -25px -190px;
            }
        }
    }
    .active{
        background: #e9e9e9;
    }
}
</style>
