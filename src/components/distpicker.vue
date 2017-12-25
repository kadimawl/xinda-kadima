<template>
  <div>
    <select name="" class="province" @change="proChange" v-model="province">
      <option value="0">省</option>
      <option :value="code" v-for="(province,code) in provinces" :key="province.code">{{province}}</option>
    </select>
    <select name="" class="city" @change="cityChange" v-model="city">
      <option value="0">市</option>
      <option :value="code" v-for="(city,code) in citys" :key="city.code">{{city}}</option>
    </select>
    <select name="" class="area" v-model="area" @change="areaChange">
      <option value="0">区</option>
      <option :value="code" v-for="(area,code) in areas" :key="area.code">{{area}}</option>
    </select>
  </div>

</template>
<script>
import { mapGetters } from "vuex";
import dist from "../districts/districts";
export default {
  data() {
    return {
      province: "0",
      provinces: dist[100000],
      city: "0",
      citys: [],
      area: "0",
      areas: []
    };
  },
  created() {
    var that = this;
    this.showarea(this.getRegionId);
  },
  computed: {
    ...mapGetters(['getRegionId'])
  },
  props: {
    regionId: String
  },
  methods: {
    proChange() {
      this.city = "0";
      this.area = "0";
      if (this.province != "0") {
        this.citys = dist[this.province];
      }
    },
    cityChange() {
      this.areas = dist[this.city];
    },
    areaChange() {
      this.$emit("selected", this.area);
    },
    // 三级联动显示
    showarea(code) {
      console.log(code);
      var that = this;
      var codearr = code.split("");
      codearr.splice(4, 2, "0", "0");
      var codecity = codearr.join("");
      codearr.splice(2, 2, "0", "0");
      var codepro = codearr.join("");
      this.province = codepro;
      that.proChange();
      this.city = codecity;
      that.cityChange();
      this.area = code;
      that.areaChange();
    }
  }
};
</script>
<style scoped lang="less">
.province,
.city,
.area {
  height: 30px;
  width: 90px;
  font-size: 0.7rem;
}
option {
  height: 30px;
  width: 90px;
  font-size: 0.5rem;
  margin-bottom: 26px;
}
</style>

