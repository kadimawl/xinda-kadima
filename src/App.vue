<template>
  <div id="app">
    <top/>
    <router-view/>
    <bottom/>
  </div>  
</template>

<script>
import top from "./components/top";
import bottom from "./components/bottom";

export default {
  name: "app",
  components: { top, bottom } //需要在当前组件内注册（添加）
};
</script>

<<<<<<< HEAD
<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
=======
<style>

>>>>>>> 989622f11ab76cca1765fb1f016e6137e9c765bd
</style>
