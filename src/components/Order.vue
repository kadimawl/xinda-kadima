<template>
  <div class="body">
    <sele/>
    <router-view/>
  </div>
</template>

<script>
import sele from "./sele";
export default {
  components: { sele }, //需要在当前组件内注册（添加）
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>