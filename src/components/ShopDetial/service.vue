<template>
  <div class="service">
      <div class="serviceTop">
          <a href="javascript:viod(0)">服务内容</a>
          <a href="javascript:viod(0)">商品评价</a>
      </div>
      <!-- <div class="serviceBody">
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // table:[]
    };
  },
  created() {
    var that = this;
    var shops = JSON.parse(sessionStorage.getItem("shopping"));
    !(function(shops) {
      //   console.log(shops.serviceList[0].serviceContent);
      var table = shops.serviceList[0].serviceContent;
      //   that.table = table;
      var box = document.createElement("div");
      box.innerHTML = table;
      //   console.log(box);
      var body = document.querySelector("body");
      body.appendChild = box;
    })(shops);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>