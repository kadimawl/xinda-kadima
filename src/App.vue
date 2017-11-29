<template>
  <div id="app">
    <top></top>
    <img src="./assets/logo.png">
    <router-view/>   <!--自带标签-->
    <bottom/>
  </div>
</template>

<script>
import top from "./components/top";
import bottom from "./components/bottom";
export default {
  name: "app",
  components: { top, bottom }    //需要在当前组件内注册（添加）
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
