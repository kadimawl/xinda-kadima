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

  // p {
  //   font-size: 0.3rem;
  //   color: #fff;
  //   margin:0 auto;
  //   margin-left: 36%;
  //   line-height: 0.6rem;
  // }

</style>
