<template>
    <div class="shophome">
       
    </div>
</template>

<script>
export default {
    created(){
        console.log(this.$route.query.storeId);
    },
    data(){
        return{

        };
    },
    components: {}
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.shophome{
    width: 100%;
    margin: 0 auto;
}
</style>
