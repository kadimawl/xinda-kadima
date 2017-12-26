<template>
    <div>
        <arrow/>
        <div class="users">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
import arrow from "../arrow";
export default {
  components: { arrow }
};
</script>

<style lang="less" scoped>
.users {
  width: 100%;
  margin: .80rem auto 0;
}
</style>
