<template>
    <div class="routerBox">
        <!-- 这是wx端一级路由，所有wx端都挂这下面 -->
        <router-view/>
        <mobileBottom/>
    </div>
</template>

<script>
import mobileBottom from '@/components/mobileBottom'
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
    max-width: 768px;
    max-height: 1280px;
    margin: 0 auto;
}

</style>
