<template>
    <div class="routerBox">
        <!-- 这是wx端一级路由，所有wx端都挂这下面 -->
        <router-view/>
    </div>
</template>

<script>
  // window.location.href = "#/";

export default {
  data(){
    return{

    };
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

</style>
