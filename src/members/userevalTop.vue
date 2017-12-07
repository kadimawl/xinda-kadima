<template>
<div class="userevalTop">
    <div class="myeval">
      <p>我的评价</p>
    </div>
    <div class="evalStatus">
        <router-link to="/member/userEval/evalNone" class="none common" active-class="active">未评价<span></span></router-link>
        <router-link to="/member/userEval/evalAlready" class="already common" active-class="active">已评价<span></span></router-link>
    </div>
    
</div>
  
</template>

<script>
export default {
    data() {
        return {
            span1:true,
            span2:false
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
    width: 960px;
    height:101px;
    margin: 30px 0 0 20px;
    display: flex;
    flex-direction: column;
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
    .evalStatus{
        width: 954px;
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
        }
    }
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
