<template>
  <div class="hello">
    <top/>
    <router-view></router-view>
    <bottom/>
  </div>
</template>

<script>
import top from "@/components/top";
import bottom from "@/components/bottom";
export default {
  name: "HelloWorld",
  components: { top, bottom }, //需要在当前组件内注册（添加）
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
