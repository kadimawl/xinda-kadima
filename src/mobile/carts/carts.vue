<template>
  <div class="cart">
      <router-view></router-view>
      <cartBottom/>
  </div>
</template>

<script>
import cartBottom from './cartBottom'
export default {
  components: {cartBottom}
}
</script>

<style lang="less" scoped>

</style>
