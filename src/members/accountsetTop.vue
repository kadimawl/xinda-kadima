<template>
<div class="acTop">
    <router-link to="/member/accountSet/accountsetBody" class="acSet common" active-class="active">账户设置<span></span></router-link>
    <router-link to="/member/accountSet/changePd" class="changePd common" active-class="active">修改密码<span></span></router-link>
</div>
  
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {  }
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
    .active{
        border-bottom: 2px solid #2693d4;
        color: #77b4e0;
        z-index: 5;
    }
}
 
</style>
