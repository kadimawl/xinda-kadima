<template>
<div class="member">
    <top/>
    <!-- 公共头放在盒子里 -->
    <div class="membertop">
        <sele/>
    </div>
    <!-- 会员中心主体 -->
    <div class="memmberb">
        <user/>
        <router-view/>
    </div>
    <bottom/>   
</div>
  
</template>

<script>
import user from './user'
import sele from '@/components/sele'
import top from '@/components/top'
import bottom from '@/components/bottom'

export default {
    data() {
        return {};
    },
    components: { user,sele,top,bottom }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
// 定下最大的盒子宽高
.member{
    width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
    .membertop{
        margin-bottom: 20px;
    }
    .memmberb{
        display: flex;
    }
}
</style>
