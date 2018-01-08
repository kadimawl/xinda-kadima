<template>
  <div class="shop">
    <arrow/>
    <router-view></router-view>
  </div>
</template>

<script>
import arrow from "../arrow";
export default {
  components: { arrow},
  methods:{
    goBack(){
      history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>

 

</style>
