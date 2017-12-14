<template>
  <div class="credentials">
    <div class="navgation">
        <router-link :to="{ path: '/shopList'}" replace>服务产品</router-link>
        <router-link :to="{ path: '/shopList/custom'}" replace>客服</router-link>
        <router-link :to="{ path: '/shopList/product'}" replace>资质证书</router-link>
    </div>
    <h1>服务内容</h1>
    <div class="shopping">  
        <div v-for="list in lists" :key="list.id">
          <h3>{{list.serviceName}}</h3>
          <img src="../../../assets/shop/blue.png" alt="">
          <p>{{list.serviceInfo}}</p>
          <p>销量:</p>
          <h2>￥{{list.marketPrice}}.00</h2>
          <del>原价：￥{{list.price}}.00</del>
          <a href="#/detial" :id="list.id" @click="GoToShop(list.id)">查看详情>></a>
        </div>
    </div>
    <div class="number">
      <button class="cli" @click="pages(pags-1,dat)">上一页</button>
      <button v-for="num in nums" :key="num" @click="pages(num,dat)">{{num}}</button>
      <button class="cli" @click="pages(pags+1,dat)">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var that = this;
    var shopID = sessionStorage.getItem("shopID");
    this.ajax //请求店铺商品
      .post(
        "/xinda-api/product/package/grid",
        this.qs.stringify({
          start: 1,
          providerId: shopID,
          sort: 2
        })
      )
      .then(function(data) {
        that.list(data.data.data);
        that.dat = data.data.data;
      });
  },
  data() {
    return {
      dat: [],
      lists: [],
      nums: [],
      pags: 1
    };
  },
  methods: {
    GoToShop(id) {
      sessionStorage.setItem("shoppingID", id);
    },
    list(lists) {
      var a = lists.length;
      var b = a % 6;
      if (b == 0) {
        var c = a / 6;
      } else {
        var c = (a - b) / 6 + 1;
      }
      for (var i = 0; i < c; i++) {
        this.nums[i] = i + 1;
      }
      for (var key in lists) {
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
      this.pages(1, lists);
    },
    pages(pag, lists) {
      var a = lists.length;
      var b = a % 6;
      if (b == 0) {
        var c = a / 6;
      } else {
        var c = (a - b) / 6 + 1;
      }
      if (pag < 1) {
        pag = 1;
      } else if (pag > c) {
        pag = c;
      }
      var p = (pag - 1) * 6;
      var q = p + 6;
      if (q > a) {
        q = a;
      }
      this.lists = [];
      this.pags = pag;
      for (var i = p; i < q; i++) {
        this.lists.push(lists[i]);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.credentials {
  position: relative;
}
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
  padding: 15px;
  padding-right: 0;
  div {
    width: 250px;
    height: 160px;
    margin-bottom: 15px;
    margin-right: 13px;
    border: 1px solid #b6b6b6;
    padding: 15px 10px;
    h3 {
      font-size: 17px;
      font-weight: normal;
    }
    p {
      font-size: 14px;
    }
    h2 {
      font-size: 35px;
      color: #2693d4;
    }
    del {
      font-size: 13px;
    }
    a {
      font-size: 13px;
      color: #2693d4;
      text-decoration: none;
      float: right;
      margin-top: 3px;
    }
  }
}
.number {
  position: absolute;
  top: 600px;
  button {
    width: 30px;
    height: 30px;
    background: #ffffff;
    outline: none;
  }
  .cli {
    width: 60px;
    vertical-align: bottom;
  }
}
</style>