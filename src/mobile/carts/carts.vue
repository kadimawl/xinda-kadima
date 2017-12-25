<template>
  <div class="cart">
      <router-view></router-view>
      <mobileBottom/>
  </div>
</template>

<script>
import mobileBottom from '../mobileBottom'
export default {
  components: {mobileBottom}
}
</script>

<style lang="less" scoped>

</style>
