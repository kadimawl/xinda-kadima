<template>
  <div >
    <h3>这是顶部</h3>
    <a href="#">注册</a>
  </div>
</template>

<script>
export default {
  data () {
      return {}
  }
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
