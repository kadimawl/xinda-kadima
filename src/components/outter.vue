<template>
  <div >
    <h3>这是系统外部</h3>
    <ohead></ohead>
    <router-view/>
  </div>
</template>

<script>
import ohead from './ohead'
export default {
  data () {
      return {}
  },
  components:{ohead}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// h3{
    // color: #f00;
// }
@color : red;
div{
    color: @color;
}
</style>
