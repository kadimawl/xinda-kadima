<template>
    <div>
        <arrow/>
        <div class="store">
            <!-- 店铺二级路由，下有两个独立模块 -->
            <router-view/>
            <mobileBottom/>
        </div>
    </div>

</template>

<script>
import mobileBottom from "@/mobile/mobileBottom";
import arrow from "../arrow";
export default {
  components: { mobileBottom, arrow }
};
</script>

<style lang="less" scoped>
.store {
  width: 100%;
  margin-top: .80rem;
}
</style>
