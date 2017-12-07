<template>
  <div class="page">
    <div class="home">首页/{{name}}</div>
    <div class="box">
      <div class="left">
        <div class="innerT">
          <div class="serverRow Row">
            <div class="server">服务分类</div>
            <div class="serverList"></div>
          </div>
          <div class="typeRow Row">
            <div class="type">类型</div>
            <div class="typrList"></div>
          </div>
          <div class="spaceRow Row">
            <div class="space">服务区域</div>
            <div class="spaceList"></div>
          </div>
        </div>
        <div class="innerB"></div>

      </div>
      <div class="right">
        <div class="platform"></div>
        <p class="">平台担保</p>
        <div class="quality"></div>
        <p class="">优质服务</p>
        <div class="process"></div>
        <p class="">过程监督</p>
        <div class="added"></div>
        <p class="">增值服务</p>
      </div>
    </div>
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
.page {
  max-width: 1200px;
  margin: 26px auto 0;
  .home {
    height: 13px;
    font-size: 13px;
    line-height: 13px;
    color: #2a2a2a;
    margin-bottom: 7px;
  }
}
.box {
  display: flex;
  .left {
    width: 948px;
    .innerT {
      border: 1px solid #ccc;
      border-top: none;
      margin-bottom: 25px;
    }
    .innerB {
      height: 468px;
      border: 1px solid #ccc;
    }
  }

  .right {
    width: 236px;
    height: 658px;
    margin-left: 12px;
    border: 1px solid #ccc;
    padding: 0 37px 0 28px;
    box-sizing: border-box;
    div{
      width: 93px;
      height: 93px;
      margin: 13px auto 29px;
      border-radius: 50%;
      background: url(../../assets/index/Sprites.png);
    }
    p{
      width: 171px;
      height: 29px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      line-height: 29px;
      text-align: center; 
    }
    P:last-child{
      border: none;
    }
    .platform{
      background-position: -239px 20px;
    }
    .quality{
      background-position: -239px -76px;
    }
    .process{
      background-position: -230px -160px;
    }
    .added{
      background-position: -250px -270px;
    }
  }
}
.Row {
  height: 40px;
  border-top: 1px solid #ccc;
  display: flex;
  div:first-child {
    width: 98px;
    height: 40px;
    border-right: 1px solid #ccc;
    font-size: 15px;
    color: #000;
    line-height: 40px;
    text-align: center;
  }
}
</style>