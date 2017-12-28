<template>
<div class="turn">
    <div class="prepage pageturn" @click="prepage">上一页</div>
    <div class="diamond"  v-for="(page,index) in nums" :key="index" @click="pagechange(index)" :class="{'checked':index==pagenum}">{{page}}</div>
    <!-- <div class="diamond" v-if="maxshow">...</div>
    <div class="diamond" v-if="maxshow">{{maxpage}}</div> --> 
    <div class="nextpage pageturn" @click="nextpage">下一页</div>
</div>
  
</template>

<script>
export default {
    created(){
    },
    data() {
        return {
            pagenum:0,//
            nums:[],//
        };
    },
    props:{//['total','pagesize']
        total:String,
        pagesize:Number,
    },
    watch:{//检测变化
        total(newVal,oldVal){
            var pages = Math.ceil(this.total/this.pagesize);
            for(let i=0;i<pages;i++){//无法实时检测数组的赋值，而数组的push可以检测到
                this.nums.push(i+1);
            }
        }
    },
    methods:{
        // 上一页
        prepage(){
            if(this.pagenum>=0){
                this.pagenum=this.pagenum==0?0:this.pagenum-1;
                this.$emit('pagevary',this.pagenum);
            }
        },
        // 页数改变
        pagechange(index){
            this.pagenum=index;
            this.$emit('pagevary',this.pagenum);
        },
        // 下一页
        nextpage(){
            if(this.pagenum>=0){
                this.pagenum=this.pagenum==this.nums.length-1?this.pagenum:this.pagenum+1;
                this.$emit('pagevary',this.pagenum);
            }
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
    margin-bottom: 20px;
    div{
        margin-left: 10px;
    }
    .pageturn{
        width: 60px;
        height: 40px;
        border: 1px solid #cccccc;
        color: #cccccc;
        line-height: 40px;
        cursor: pointer;
    }
    .diamond{
        width: 40px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }  
    .checked{
        color: #2693d4;
        border: 1px solid #2693d4;
    }
  }

</style>
