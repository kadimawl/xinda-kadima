<template>
  <div >
    <outHead></outHead>
    <div class="outBox">
      <div class="content">
        
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import outHead from "@/views/outHead";
export default {
  components: { outHead },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
}
.outBox {
  background: #f5f5f5;
  height: 476px;
  padding: 42px 20px 0;
  .content {
    width: 1200px;
    height: 435px;
    margin: 0 auto 0;
    background: #fff;
  }
}
</style>
