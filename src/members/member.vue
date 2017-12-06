<template>
<div class="member">
<<<<<<< HEAD
    <!-- 公共头放在盒子里 -->
    <div class="membertop">
        <sele/>
    </div>
    <!-- 会员中心主体 -->
    <div class="memmberb">
        <user/>
        <router-view/>
    </div>
        
=======
  <sele/>
  <user/>
  <router-view/>
>>>>>>> b7937919843b48a3bc0478ebb0ce66a2436dacb7
</div>
  
</template>

<script>
<<<<<<< HEAD
import user from './user'
import sele from '@/components/sele'
export default {
    data() {
        return {};
    },
    components: { user,sele }
=======
import sele from "@/components/sele"
import user from "./user"
export default {
  data() {
    return {};
  },
  components: { user,sele }
>>>>>>> b7937919843b48a3bc0478ebb0ce66a2436dacb7
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
<<<<<<< HEAD
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
=======

.member {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  // display: flex;
>>>>>>> b7937919843b48a3bc0478ebb0ce66a2436dacb7
}
</style>
