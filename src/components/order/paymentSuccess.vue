<template>
  <div class="body">
    <p>首页/支付</p>
    <h5>支付成功</h5>
    <div>
      <img src="" alt="">
      <div>
        <h2>支付成功！</h2>
        <h4>我们将尽快确认您的（订单号：{{payID}}）付款信息。</h4>
        <p>如有问题，请联系客服：</p>
        <h3>010-83421842</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payID:'12314414'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  
</style>