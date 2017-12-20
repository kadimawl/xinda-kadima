<template>
    <div class="routerBox">
        <!-- 这是wx端一级路由，所有wx端都挂这下面 -->
        <router-view/>
        <mobileBottom/>
    </div>
</template>

<script>
import mobileBottom from "@/components/mobileBottom";
export default {
  components: { mobileBottom }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

/*移动端适配*/
@media screen and (max-width: 359px) and (min-width: 320px) {
  html,
  body {
    font-size: 13px !important;
  }
}
@media screen and (max-width: 374px) and (min-width: 360px) {
  html,
  body {
    font-size: 15px !important;
  }
}
@media screen and (max-width: 413px) and (min-width: 375px) {
  html,
  body {
    font-size: 16px !important;
  }
}
@media screen and (max-width: 639px) and (min-width: 414px) {
  html,
  body {
    font-size: 18px !important;
  }
}
@media screen and (min-width: 640px) and (max-width: 1200px) {
  html,
  body {
    font-size: 27px !important;
  }
}
</style>
