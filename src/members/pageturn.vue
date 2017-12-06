<template>
<div class="turn">
    <div class="tprevious pageturn">上一页</div>
    <div class="firstpage diamond">1</div>
    <div class="tnext pageturn">下一页</div>
</div>
  
</template>

<script>
// import select from 
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
.turn{
    width: 940px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    margin-top: 40px;
    div{
        margin-left: 10px;
    }
    .tprevious{
        margin-left: 340px;
    }
    .pageturn{
        width: 68px;
        height: 38px;
        border: 1px solid #cccccc;
        color: #cccccc;
        line-height: 38px;
    }
    .diamond{
        width: 38px;
        height: 38px;
        color:#2792d6;
        border: 1px solid #2693d4;
        line-height: 38px;
    }  
  }

</style>
