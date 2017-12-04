<template>
<div class="myorder">
    <div class="topname">
      <p>我的订单</p>
    </div>
    <div class="search">
        <p>订单号：</p><input type="text" placeholder="请输入订单号搜索"> <button>搜索</button>
    </div>
    <div class="time">
      <p>创建时间：</p><input type="text" class="startt"><span></span><input type="text" class="endt"><span></span>
    </div>
    <div class=""></div>
    <div class=""></div>
    
</div>
  
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.myorder{
    width: 970px;
    height: 660px;
    margin-left: 30px;
    margin-top: 30px;
    display: block;
    flex-direction: column;
    .topname{
        width: 90%;
        height: 32px;
        border-bottom: 2px solid #e9e9e9;
        text-align: center;
        margin-bottom: 16px;
        p{
            width: 115px;
            color: #73b2de;
            height: 32px;
            z-index: 5;
            line-height: 32px;
            font-size: 16px;
            border-bottom: 2px solid #2693d4;
        }
    }
    .search{
        height: 25px;
        line-height: 30px;
        display: flex;
        margin-top:25px;
        p{
            color: #888888;
            margin-right: 20px;
        }
        input{
            width: 265px;
            height: 24px;
            border: 1px solid #b0b0b0;
        }
        button{
            width: 72px;
            height: 26px;
            border: 1px solid #2693d4;
            border-radius: 4px;
            margin-left: 12px;
            background: #ffffff;
            color: #66a9dd;
            box-shadow:0 0 1px 1px #66a9dd ;
        }
    }
    .time{
        height: 20px;
        display: flex;
        margin: 30px 0;
        line-height:30px;
        p{
            color: #888888;
            margin-right: 4px;
        }
        input{
            width: 113px;
            height: 24px;
            border: 1px solid #b0b0b0;
        }
        span{
            display: block;
            width:26px;
            background: url('../assets/index/memCen.png') no-repeat;
            background-position: -25px -222px;
            height: 20px;
            position: relative;
            left: -26px;
            top: 2px;
        }
    }
}




  
  
 
</style>
