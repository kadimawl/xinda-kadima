<template>
<div class="userevalTop">
    <!-- 跳转路由页 -->
    <!-- top标签 -->
    <div class="myeval">
      <p>我的评价</p>
    </div>
    <!-- 评价的跳转标签 -->
    <div class="evalStatus">
        <router-link to="/member/userEval/evalNone" class="common" active-class="active">未评价<span></span></router-link>
        <router-link to="/member/userEval/evalAlready" class="common" active-class="active">已评价<span></span></router-link>
    </div>
    
</div>
  
</template>

<script>
// 该页面控制了已评价和未评价的跳转
export default {
    data() {
        return {
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}
.userevalTop{
    width: 900px;
    height:101px;
    margin: 30px 0 0 20px;
    display: flex;
    flex-direction: column;
    // 顶部标签
    .myeval{
        width: 90%;
        height: 30px;
        border-bottom: 2px solid #e9e9e9; 
        p{
            width: 116px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            z-index: 5;
            border-bottom: 2px solid #2693d4; 
            color: #2693d4;
        }
    }
    // 评价标签
    .evalStatus{
        width: 900px;
        height: 44px;
        display: flex; 
        background: #f7f7f7; 
        border: 1px solid #cccccc;
        margin-top: 24px;
        .common{
            width: 108px;
            height: 44px;
            line-height: 44px;  
            text-align: center;
            text-decoration: none;
            span{
                position: relative;
                top: 38px;
                left: -30px;
            }
            color:#000;
        }
    }
    // 标签激活时的样式
    .active{
        background: #2693d4;
        color: #ffffff;
        span{
            border-top: 5px solid #2693d4;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
        }
    }
}
</style>
