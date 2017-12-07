<template>
  <div class="credentials">
    <div class="navgation">
        <a href="/#/shopList">服务产品</a>
        <a href="/#/shopList/custom">客服</a>
        <a href="/#/shopList/product">资质证书</a>
    </div>
    <h1>服务内容</h1>
    <div class="shopping">
        <div v-for="list in lists" :key="list.id">
          <h3>{{list.serviceName}}</h3>
          <img src="../../assets/shop/blue.png" alt="">
          <p>{{list.serviceInfo}}</p>
          <p>销量:</p>
          <h2>￥{{list.marketPrice}}.00</h2>
          <del>原价：￥{{list.price}}.00</del>
          <a href="#/detial" :id="list.id" @click="GoToShop(list.id)">查看详情>></a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var that = this;
    var shopList = JSON.parse(sessionStorage.getItem("shopList"));
    !(function(list) {
      var lists = list;
      for (var key in lists) {
        // var XXX = Math.floor(Math.random() * 9 + 1) / 10;
        lists[key].price = Math.floor(lists[key].marketPrice * (0.2 + 1));
        if (lists[key].serviceName.length > 13) {
          lists[key].serviceName = lists[key].serviceName.substr(0, 13);
          lists[key].serviceName += "...";
        }
        if (lists[key].serviceInfo.length > 17) {
          lists[key].serviceInfo = lists[key].serviceInfo.substr(0, 17);
          lists[key].serviceInfo += "...";
        }
      }
      that.lists = lists;
    })(shopList);
  },
  data() {
    return {
      lists: []
    };
  },
  methods:{
    GoToShop(id){
      sessionStorage.setItem("shoppingID",id)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.navgation {
  height: 40px;
  border-bottom: 2px solid #e9e9e9;
  a {
    display: inline-block;
    width: 110px;
    height: 40px;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    color: #3f3f3f;
    margin: 0 10px;
  }
  a:nth-child(1) {
    border-bottom: 2px solid #2693d4;
    color: #2693d4;
  }
}
h1 {
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #2693d8;
  border-bottom: 1px solid #e9e9e9;
}
.shopping {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding: 15px;
  div {
    width: 250px;
    height: 160px;
    margin-bottom: 15px;
    border: 1px solid #b6b6b6;
    padding: 15px 10px;
    h3 {
      font-size: 17px;
      font-weight: normal;
    }
    p{
      font-size: 14px;
    }
    h2{
      font-size: 35px;
      color: #2693d4;
    }
    del{
      font-size: 13px;
    }
    a{
      font-size: 13px;
      color: #2693d4;
      text-decoration: none;
      float: right;
      margin-top: 3px;
    }
  }
}
</style>