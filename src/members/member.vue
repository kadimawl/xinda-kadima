<template>
<div class="member">
         <user/>
         <router-view/>
</div>
  
</template>

<script>
import user from './user'
export default {
  data() {
    return {};
  },
   components: { user }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}


.member{
   width: 1200px;
   margin: 0 auto;
   padding: 10px 20px;
   display: flex;
}



  
  
 
</style>
