<template>
    <div class="store">
        <!-- 店铺二级路由，下有两个独立模块 -->
        <router-view/>
    </div>
</template>

<script>
export default {
    components: {},
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.store{
    max-width: 750px;
    height: 1334px;
    width: 100%;
}
</style>
