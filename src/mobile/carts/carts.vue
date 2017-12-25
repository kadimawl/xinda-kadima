<template>
  <div class="cart">
      <router-view></router-view>
      <cartBottom/>
      <mobileBottom/>
  </div>
</template>

<script>
import cartBottom from './cartBottom'
import mobileBottom from '../mobileBottom'
export default {
  components: {cartBottom,mobileBottom}
}
</script>

<style lang="less" scoped>

</style>
