<template>
  <div class="service">
      <div class="serviceTop">
          <router-link :to="{ path: '/detial/service'}" replace>服务内容</router-link>
          <a href="javascript:void(0)">商品评价</a>
          <span></span>
      </div>
      <div class="serviceBody">
        <div>
          <div>
            <div>
              <h1>0%</h1>
              <p>好评</p>
            </div>
            <div>
              <div><p>好评（0%）</p><span></span></div>
              <div><p>中评（0%）</p><span></span></div>
              <div><p>差评（0%）</p><span></span></div>
            </div>
          </div>
          <div>
            <p>客户印象</p>
            <p>暂无已添加的印象标签</p>
          </div>
        </div>
        <div>
          <div>
            <input type="button" value="全部评价（0）">
            <input type="button" value="好评（0）">
            <input type="button" value="中评（0）">
            <input type="button" value="差评（0）">
          </div>
          <div>
            <div>
              <p>评价</p>
              <p>满意度</p>
              <p>用户</p>
            </div>
            <div>
              <input type="button" value="上一页">
              <input type="button" value="1">
              <input type="button" value="下一页">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluate: []
    };
  },
  created() {
    var that = this;
    var shoppingID = this.$route.query.shoppingId;
    this.ajax
      .post(
        "/xinda-api/product/judge/detail",
        this.qs.stringify({
          serviceId: shoppingID
        })
      )
      .then(function(data) {
      });
    this.ajax
      .post(
        "/xinda-api/product/judge/grid",
        this.qs.stringify({
          start: 0,
          limit: 10,
          serviceId: shoppingID,
          type: 1
        })
      )
      .then(function(data) {
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.serviceTop {
  border: 1px solid #cccccc;
  height: 43px;
  background: #f7f7f7;
  position: relative;
  a {
    display: inline-block;
    text-align: center;
    line-height: 43px;
    width: 135px;
    font-size: 14px;
    text-decoration: none;
    color: #3c3c3c;
  }
  a:nth-child(2) {
    background: #2693d4;
    border: 1px solid #2693d4;
    position: relative;
    top: -1px;
    left: -1px;
    color: #ffffff;
  }
  span {
    display: block;
    position: absolute;
    top: 44px;
    left: 195px;
    border-top: 7px solid #2693d4;
    border-left: 7px solid #ffffff;
    border-right: 7px solid #ffffff;
    border-bottom: 7px solid #ffffff;
  }
}
.serviceBody {
  padding: 45px 30px;
  margin-bottom: 70px;
  border: 1px solid #cccccc;
  border-top: none;
}
</style>