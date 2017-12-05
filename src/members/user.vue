<template>
<div class="user">
    <p>首页&nbsp/&nbsp个人主页</p>
    <div class="touxiang">
         <img src="../assets/index/user.png" alt="用户头像">
         <p>{{userphone}}</p>
    </div>
    <div class="nav">
         <div class="myorder active"><span></span><p>我的订单</p></div>
         <div class="usereval"><span></span><p>用户评价</p></div>
         <div class="accountset"><span></span><p>账户设置</p></div>
    </div>

</div>
  
</template>

<script>
// import select from 
export default {
  data() {
    return {
        userphone:'13854285852' 
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
.user{
    width: 250px;
    height: 580px;
    display: flex;
    flex-direction: column;
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
        div{
            width: 100%;
            height: 50px;
            display: flex;
            line-height: 50px;
            cursor: pointer;
            span{
                display: block;
                width: 27px;
                height: 25px;
                margin: auto 0;
                margin-left: 55px;
                margin-right: 10px;
            }
            p{
                font-size: 20px;
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
