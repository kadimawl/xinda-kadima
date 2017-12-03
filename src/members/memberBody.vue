<template>
<div class="memeber">
    <h3>用户订单</h3>
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
.dispf{
  display: flex;
}
.member{
  .member-body{
      .dispf;
}
}



  
  
 
</style>
