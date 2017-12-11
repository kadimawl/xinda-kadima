<template>
  <div class="headeBox">
    <div class="imgBox"></div>
    <div class="sinda"><p >信达</p></div>
    <div class="nullLine"></div>
    <div class="welcome">{{getTitle}}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['getTitle'])
  },
  methods:{
    ...mapActions(['setTitle']),
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.headeBox {
  height: 97px;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  .imgBox {
    width: 52px;
    height: 56px;
    margin: auto 12px;
    background: url(../assets/index/Sprites.png) 0 0;
  }
  .sinda {
    width: 98px;
    height: 28px;
    margin: auto 0;
    line-height: 28px;
    font-size: 28px;
    font-weight: 700;
  }
  .nullLine{
    width: 1px;
    height: 47px;
    background: #b4b4b4;
    margin: auto 0;
  }
  .welcome{
    height: 18px;
    margin: auto 0 auto 26px;
    line-height: 18px;
    font-size: 18px;
    letter-spacing: 1px;
  }
}
</style>
