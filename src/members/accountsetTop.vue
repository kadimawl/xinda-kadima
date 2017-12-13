<template>
<div class="acTop">
    <!-- 账户设置与修改密码的跳转标签 -->
    <router-link to="/member/accountSet/accountsetBody" class="acSet common" active-class="active">账户设置</router-link>
    <router-link to="/member/accountSet/changePd" class="changePd common" active-class="active">修改密码</router-link>
</div>
  
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.acTop{
    width: 880px;
    height: 30px;
    display: flex;
    border-bottom: 2px solid #e9e9e9;
    margin-top: 30px;
    margin-left: 20px;
    .common{
        width: 110px;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        text-align: center;
        text-decoration: none;
    }
    // 跳转标签加的样式
    .active{
        border-bottom: 2px solid #2693d4;
        color: #77b4e0;
        z-index: 5;
    }
}
 
</style>
