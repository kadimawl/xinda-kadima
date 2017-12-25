<template>
    <div class="store">
        <!-- 店铺二级路由，下有两个独立模块 -->
        <router-view/>
        <mobileBottom/>
    </div>
</template>

<script>
import mobileBottom from '@/mobile/mobileBottom'
export default {
    components: {mobileBottom},
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.store{
    width: 100%;
    margin: 0 auto;
}
</style>
