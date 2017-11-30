<template>
  <div id="app">
    <top/>
    <router-view/>   <!--自带标签-->
    <bottom/>
  </div>
</template>

<script>
import top from "./components/top";
import sele from "./components/sele";
import bottom from "./components/bottom";
export default {
  name: "app",
  components: { top, sele, bottom } //需要在当前组件内注册（添加）
};
</script>

<style>

</style>
