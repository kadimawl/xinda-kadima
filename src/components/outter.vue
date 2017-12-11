<template>
  <div >
    <top/>
    <outHead ></outHead>
    <div class="outBox">
      <div class="content">
        <router-view/>
      </div>
    </div>
    <anotherBottom/>
  </div>
</template>

<script>
import outHead from "@/views/outHead";
import top from "./top";
import anotherBottom from "./anotherBottom";
export default {
  components: { outHead ,top,anotherBottom},
  data() {
    return {
      // seleShow: false,
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.outBox {
  background: #f5f5f5;
  height: 487px;
  padding: 52px 20px 0 20px;
  box-sizing: border-box;
  .content {
    width: 1200px;
    height: 435px;
    margin: 0 auto 0;
    background: #fff;
    padding-top: 34px;
    box-sizing: border-box;
  }
  
}

</style>
