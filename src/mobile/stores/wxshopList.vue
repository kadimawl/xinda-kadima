<template>
    <div class="routerBox">
        <!-- 这是wx端一级路由，所有wx端都挂这下面 -->
        <router-view/>
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
*{
    margin: 0;
    padding: 0;
}
.routerBox{
    min-width: 320px;
    max-width: 768px;
    margin: 0 auto;
    min-height: 568px;
    max-height: 1280px;
    width: 100%;
    height: 100%;
}
</style>
