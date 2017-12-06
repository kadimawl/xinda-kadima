<template>
<div class="userEval">
    <userevalTop/>
    <router-view/>
    <pageturn/>
</div>
  
</template>

<script>
import userevalTop from './userevalTop'
import pageturn from './pageturn'
export default {
  data() {
    return {};
  },
   components: { userevalTop,pageturn }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

 
</style>
