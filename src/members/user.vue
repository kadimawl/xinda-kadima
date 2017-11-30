<template>
<div class="memeber">
    <!-- <select/> -->
    <div class="member-body">
         <user/>
         <router-view/>
    </div>
</div>
  
</template>

<script>
// import select from 
export default {
  data() {
    return {};
  }
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
