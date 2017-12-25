<template>
<div class="body">
    <!-- <h3>这是产品分类</h3> -->
    <div class="left">
        <p v-for="(data,index) in datas" :key="data.id" @click="leftC(index)" v-bind:class="{Ccli:index==Ccli}">{{data.name}}</p>
    </div>
    <div class="right">
        <div v-for="(dataI,index) in datas" :key="dataI.id" v-bind:class="{Ddis:index==Ddis}">
            <div v-for="dataII in dataI.itemList" :key="dataII.id" @click="gotoPro(dataII.code)">
                <a href="javascript:void(0)">{{dataII.name}}</a>
                <p v-for="dataIII in dataII.itemList" :key="dataIII.id">{{dataIII.name}}<span>></span></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      Ccli: "",
      Ddis: ""
    };
  },
  created() {
    var that = this;
    this.ajax
      .post("http://115.182.107.203:8088/xinda/xinda-api/product/style/list")
      .then(function(data) {
        var datas = data.data.data;
        for (var i in datas) {
          sort(datas[i].itemList);
          for (var j in datas) {
            if (i != j && datas[i].code < datas[j].code) {
              var sor = datas[i];
              datas[i] = datas[j];
              datas[j] = sor;
            }
          }
        }
        function sort(bat) {
          for (var ii in bat) {
            for (var jj in bat) {
              if (ii != jj && bat[ii].code < bat[jj].code) {
                var ros = bat[ii];
                bat[ii] = bat[jj];
                bat[jj] = ros;
              }
            }
          }
        }
        that.datas = datas;
        that.leftC("1eff122d06604fc1aadf9e7acefba21a");
      });
  },
  methods: {
    leftC(eve) {
      this.Ccli = eve;
      this.Ddis = eve;
    },
    gotoPro(code){
      this.$router.push({ path: "/m/mProduct", query: { productTypeCode: code } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body {
  display: flex;
  .left {
    width: 2.2rem;
    p {
      display: block;
      font-size: 0.27rem;
      text-indent: 0.35rem;
      line-height: 0.94rem;
      color: #262626;
      font-weight: 550;
    }
    .Ccli {
      background: #f3f4f6;
    }
  }
  .right {
    width: 100%;
    background: #f3f4f6;
    padding-left: 0.2rem;
    & > div {
      display: none;
    }
    .Ddis {
      display: block;
    }
    a {
      display: block;
      font-size: 0.28rem;
      text-indent: 0.06rem;
      line-height: 0.77rem;
      color: #676664;
      border-bottom: 1px solid #cbcbcd;
    }
    p {
      display: block;
      font-size: 0.22rem;
      text-indent: 0.05rem;
      line-height: 0.75rem;
      color: #676664;
      border-bottom: 1px solid #cbcbcd;
      margin-left: 0.7rem;
      position: relative;
      span {
        margin-right: 0.3rem;
        font-size: 0.3rem;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
