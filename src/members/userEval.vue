<template>
<div class="userEval">
    <userevalTop/>
    <router-view/>
</div>
</template>

<script>
import userevalTop from './userevalTop'
export default {
  data() {
    return {};
  },
   components: { userevalTop }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

 
</style>
