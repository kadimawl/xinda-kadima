<template>
  <div id="app">
    <top/>
<<<<<<< HEAD
    <router-view/>   <!--自带标签-->
=======
    <sele/>
    <router-view/>
>>>>>>> 1b99444865cd7e759af3cc473842864474493c17
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
