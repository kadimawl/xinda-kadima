<template>
  <div class="hello">
    <router-view></router-view>
  </div>
</template>

<script>
import sele from "./sele";
export default {
  name: "HelloWorld",
  components: {sele},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
}


</style>
