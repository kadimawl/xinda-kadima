<template>
<div class="body">
    <!-- <h3>这是产品分类</h3> -->
    <div class="left">
        <p v-for="(data,index) in datas" :key="data.id" @click="leftC(index)" v-bind:class="{Ccli:index==Ccli}">{{data.name}}</p>
    </div>
    <div class="right">
        <div v-for="(dataI,index) in datas" :key="dataI.id" v-bind:class="{Ddis:index==Ddis}">
            <div v-for="dataII in dataI.itemList" :key="dataII.id">
                <a href="javascript:viod(0)">{{dataII.name}}</a>
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
      console.log(eve);
      this.Ccli = eve;
      this.Ddis = eve;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body {
  display: flex;
  .left {
    width: 9.5rem;
    p {
      display: block;
      font-size: 1.1rem;
      text-indent: 0.8rem;
      line-height: 4rem;
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
    padding-left: 1rem;
    & > div {
      margin-bottom: 1rem;
      display: none;
    }
    .Ddis {
      display: block;
    }
    a {
      display: block;
      font-size: 1.1rem;
      text-indent: 0.5rem;
      line-height: 3rem;
      color: #676664;
      border-bottom: 1px solid #cbcbcd;
    }
    p {
      display: block;
      font-size: 0.8rem;
      text-indent: 0.5rem;
      line-height: 3rem;
      color: #676664;
      border-bottom: 1px solid #cbcbcd;
      margin-left: 2rem;
      padding-right: 3rem;
      position: relative;
      span {
        margin-right: 1rem;
        font-size: 1.5rem;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
