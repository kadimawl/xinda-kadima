<template>
<div class="evalNone">
    <div class="Nleft">
    <div class="gslogo"><img :src="tupian" alt=""></div>
    <div class="shangpin">
        <p class="name">{{gsname}}</p>
        <p class="information"><span class="spanf">服务单号：{{code}}</span><span>购买时间：{{buytime}}</span></p>
        <p class="cont">购买内容：{{cont}}</p>
    </div>
    </div>
    <div class="Nright">
        <router-link :to="{path:'/member/gotoeval'}" tag="button" class="gotoeval">去评价</router-link>
    </div>
</div>
  
</template>

<script>

export default {
//   created(){
//     this.ajax.post('/xinda/xinda-api/service/judge/grid',{
//         status:'2',
//     })
//     .then(function(a){
//           console.log(a);
//     })
//   },
  data() {
      return {
        tupian:'',
        gsname:'信达北京服务中心',
        code:'B1B23',
        buytime:'2016-1-12',
        cont:'test'
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}
.evalNone{
    width: 954px;
    height: 154px;
    border: 1px solid #cccccc;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    .Nleft{
        height: 154px;
        width: 700px;
        display: flex;
        align-items: center;
        .gslogo{
            width: 100px;
            height: 100px;
            margin: 0 15px;
            border: 1px solid #e9e9e9;
        }
        .shangpin{
            line-height: 35px;
            .information{
                display: flex;
                span{
                    display: block;
                }
                .spanf{
                    margin-right: 30px;
                }
            }
          
        }
    }
    .Nright{
        width: 170px;
        height: 154px;
        text-align: center;
        line-height: 154px;
        .gotoeval{
            width: 118px;
            height: 38px;
            border: 1px solid #2494d4;
            border-radius: 5px;
            color: #2494d4;
            background: #ffffff;
            font-size: 18px;
            cursor: pointer;
        }
    }
}
 
</style>
