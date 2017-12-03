<template>
  <div id="app">
    <top/>
    <sele/>
    <router-view/>
    <bottom/>
  </div>  
</template>

<script>
import top from "./components/top";
import sele from "./components/sele";
import bottom from "./components/bottom";
export default {
  name: "app",
<<<<<<< HEAD
  components: { top, bottom } //需要在当前组件内注册（添加）
=======
  components: { top, sele, bottom } //需要在当前组件内注册（添加）
>>>>>>> 7170c881c05e937e94070163087260405826f2d0
};
</script>

<style>
* {
  /* margin: 0;
  padding: 0; */
}
</style>
