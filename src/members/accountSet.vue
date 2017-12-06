<template>
<div class="account">
    <accountsetTop/>
    <router-view/>
</div>
  
</template>

<script>
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

.account{
    width: 930px;
    height: 500px;
}


  
  
 
</style>
