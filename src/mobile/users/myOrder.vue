<template>
    <div class="box">
        <div class="aTop">
            <span></span>
            <p>我的订单</p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  max-width: 768px;
  height: 1333px;
  margin: 0 auto;
}
.aTop {
  width: 100%;
  height: 77px;
  text-align: center;
  background: #e5e5e5;
  font-size: 28px;
  color: #000;
  line-height: 77px;
  display: flex;
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #fff;
    background: url(../../assets/mobile/mobileS.png) -12px -8px;
    // position: 
    margin: auto 0 auto 20px;
  }
  p{
      margin: 0 0 0 37%;
  }
}

</style>
