<template>
<div class="turn">
    <div class="prepage pageturn" @click="prepage">上一页</div>
    <div class="diamond" :class="{'checked':index==pagenum}" v-for="(page,index) in nums" :key="page.id" @click="pagechange(index)">{{page}}</div>
    <!-- <div class="diamond" v-if="maxshow">...</div>
    <div class="diamond" v-if="maxshow">{{maxpage}}</div> -->
    <div class="nextpage pageturn" @click="nextpage">下一页</div>
</div>
  
</template>

<script>
// import select from 
export default {
    created(){
        for(let i=0;i<this.maxpage;i++){
            nums[i]=i+1;
        }
    },
    data() {
        return {
            pagenum:1,//
            nums:[],//
            maxpage:Math.ceil(this.total/this.pagesize),//
            // maxshow:false,//
        };
    },
    props:{
        total:number,
        pagesize:number,
    },
    methods:{
        // 上一页
        prepage(){
            this.pagenum=this.pagenum==1?1:this.pagenum-1;
            this.$emit('pagevary',this.pagenum);
        },
        // 页数改变
        pagechange(index){
            this.pagenum=index;
            this.$emit('pagevary',this.pagenum);
        },
        // 下一页
        nextpage(){
            this.pagenum=this.pagenum==this.nums.length?this.pagenum:this.pagenum+1;
            this.$emit('pagevary',this.pagenum);
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.turn{
    max-width: 940px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    div{
        margin-left: 10px;
    }
    .pageturn{
        width: 60px;
        height: 40px;
        border: 1px solid #cccccc;
        color: #cccccc;
        line-height: 40px;
    }
    .diamond{
        width: 40px;
        height: 40px;
        color:#2792d6;
        border: 1px solid #2693d4;
        line-height: 40px;
    }  
    .checked{
        color: #2693d4;
        border: 1px solid #2693d4;
    }
  }

</style>
