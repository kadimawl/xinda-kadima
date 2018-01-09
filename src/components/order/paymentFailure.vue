<template>
  <div class="body">
    <p>首页/支付</p>
    <h5>支付失败</h5>
    <!-- <div class="line"></div> -->
    <div class="faild">
      <span></span>
      <div>
        <h2>支付失败！</h2>
        <h4>支付未成功：让我们再试一次吧！<p @click="getPay(id)">返回支付页</p></h4>
        <p>如有问题，请联系客服：</p>
        <h3>010-83421842</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getPay(id){
      this.$router.push({path:'/Order/orderdetail',query: {orderNo:this.$route.query.id }})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body {
  width: 1200px;
  margin: 0 auto;
  & > p {
    font-size: 13px;
    margin: 25px 0;
  }
}
h5 {
  border-bottom: 1px solid #bdbdbd;
  font-weight: normal;
  color: #2793d4;
  font-size: 13px;
  padding: 0 0 10px;
  margin-bottom: 13px;
}

.faild {
  height: 380px;
  background: #f7f7f7;
  margin-bottom: 210px;
  position: relative;
  span {
    display: block;
    width: 130px;
    height: 130px;
    background: url("../../assets/index/face.png") no-repeat 0 -3px;
    position: absolute;
    top: 125px;
    left: 200px;
  }
  div {
    margin-left: 400px;
    padding: 90px 0;
    h2 {
      color: #e54340;
      font-weight: normal;
      font-size: 30px;
    }
    h4 {
      font-weight: normal;
      p{
        display: inline-block;
        width: 124px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        background: #f7f7f7;
        border: 1px solid #2693d4;
        border-radius: 5px;
        color: #2693d4;
      }
    }
    p{
      display: inline;
      font-size: 14px
    }
    h3{
      display: inline;
      font-weight: normal;
    }
  }
}
</style>