<template>
<div>
    <div class="top"><button>默认排序</button><button>销量</button></div>
    <div class="body" v-for="shopType in shopTypes" :key="shopType.id">
        <div class="logo">
            <img :src="'http://115.182.107.203:8088/xinda/pic'+shopType.providerImg" alt="" class="logoImg">
        </div>
        <div class="shopText">
            <h3>{{shopType.providerName}}</h3>
            <p>{{shopType.regionName}}</p>
            <p>累计服务客户次数：<a href="javascript:viod(0)">{{shopType.orderNum}}</a><span>丨</span>好评率：<a href="javascript:viod(0)">100%</a></p>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      shopTypes: []
    };
  },
  created() {
    //商品列表请求函数
    var that = this;
    this.ajax
      .post("/xinda-api/provider/grid", {
        start: 0,
        limit: 6,
        productTypeCode: 10,
        regionId: 110102,
        sort: 1
      })
      .then(data => {
        var shops = data.data.data;
        that.shopTypes = shops;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top {
  text-align: center;
  padding: 1.5rem;
  button {
    width: 6rem;
    height: 1.8rem;
    border: 1px solid #2793d4;
    background: #ffffff;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  button:nth-child(1) {
    background: #2793d4;
    color: #ffffff;
    border-radius: 0.2rem 0 0 0.2rem;
  }
}
.body {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-bottom: 1px solid #cfcfcf;
}
.logo {
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  border: 1px solid #e3e3e3;
  margin-right: 1rem;
  img {
    width: 100%;
  }
}
.shopText {
  width: 65%;
  h3 {
    font-weight: 500;
  }
  p {
    font-size: 0.8rem;
    a{
        color: red;
    }
  }
  p:nth-child(2){
      text-indent: 1rem;
    margin: 0.5rem 0 1.2rem 0;
  }
}
</style>
