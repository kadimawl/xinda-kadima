<template>
<div class="memeber">
    <sele/>
    <div class="member-body">
         <user/>
         <router-view/>
    </div>
</div>
  
</template>

<script>
import sele from '../components/sele'
import user from './user'
export default {
  data() {
    return {};
  },
   components: { user,sele }
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
