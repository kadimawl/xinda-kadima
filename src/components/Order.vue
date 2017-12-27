<template>
  <div class="body">
    <sele/>
    <router-view/>
  </div>
</template>

<script>
import sele from "./sele";
import {mapActions} from 'vuex'
export default {
  components: { sele }, //需要在当前组件内注册（添加）
  data() {
    return {
      cartNum: ''
    };
  },
  methods:{
    ...mapActions(['setNum'])
  },
  created() {
    var that = this;
    this.ajax.post("xinda-api/cart/cart-num").then(data => {
      that.cartNum = data.data.data.cartNum;
      that.setNum(that.cartNum);
    });
    console.log(this.cartNum)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>