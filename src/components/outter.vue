<template>
  <div >
    <outHead></outHead>
    <div class="outBox">
      <div class="content">
        <router-view/>
      </div>
    </div>
    
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
    padding-top: 54px;
    box-sizing: border-box;
  }
  
}

</style>
