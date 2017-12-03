<template>
<div class="memeber">
    <accountsetTop/>
    <router-view/>
</div>
  
</template>

<script>
// import select from 
import accountsetTop from './accountsetTop'
export default {
  data() {
    return {};
  },
   components: { accountsetTop }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.dispf{
  display: flex;
}
.member{
  .member-body{
      .dispf;
}
}



  
  
 
</style>
