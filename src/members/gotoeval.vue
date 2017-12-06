<template>
<div class="gotoeval">
    <div class="top">
        <p>评价</p>
    </div>
    <div class="bodyer">
        <div class="shangpin">
            <p class="sercode">服务单号：{{code}}</p>
            <p class="buycon">购买内容：{{cont}}</p>
            <p class="buytime">购买时间：{{btime}}</p>
        </div>
        <div class="eval">
            <p>评价：</p>
            <input type="radio" name="pingjia"><span> 好评</span> 
            <input type="radio" name="pingjia"><span> 中评</span> 
            <input type="radio" name="pingjia"><span> 差评</span> 
        </div>
        <div class="score">
            <p>评分:</p>
            <el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </div>
        <div class="think">
            <p>感受：</p><textarea></textarea>
        </div>
    </div>
    <div class="bot">
        <button @click="submit">提交</button>
    </div>
</div>
  
</template>

<script>
export default {
    data() {
        return {
            code:'1234',
            cont:'test',
            btime:'2016-1-12',
            value2:null
        };
    },
    components:{},
    methods:{
        submit:function(){
            console.log(this.value2)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.gotoeval{
    width: 838px;
    height: 400px;
    margin: 30px 0 0 30px;
    .top{
        width: 700px;
        height: 33px;
        p{
            width: 120px;
            height: 33px;
            border-bottom: 2px solid #169bd5;
            text-align: center;
            color: #16b0e4;
            font-size: 20px;
            line-height: 33px;
        }
    }
    .bodyer{
        width: 100%;
        height: 300px;
        .shangpin{
            width: 90%;
            display: flex;
            height: 30px;
            line-height: 30px;
            margin-top: 20px;
            margin-left: 20px;
            p{
                font-size: 14px;
                margin-right: 100px;
            }
        }
        .eval{
            width: 90%;
            display: flex;
            height: 30px;
            line-height: 30px;
            margin-top: 20px;
            margin-left: 20px;
            p{
                font-size: 14px;
                margin-right: 30px;
            }
            input{
                display: block;
                background: #fff;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                margin-right: 5px;
                margin-top: 8px;
            }
            span{
                display: block;
                margin-right: 50px;
                font-size: 18px;
            }
        }
        .score{
            width: 90%;
            display: flex;
            height: 30px;
            line-height: 30px;
            margin-top: 20px;
            margin-left: 20px;
            p{
                font-size: 14px;
                margin-right: 40px;
            }
        }
        .think{
            width: 100%;
            display: flex;
            height: 144px;
            margin-top: 20px;
            margin-left: 20px;
            p{
                font-size: 14px;
                margin-right: 30px;
            }
            textarea{
                width:750px;
                height:138px;
            }

        }
    }
    .bot{
        width: 100%;
        height: 50px;
        text-align: right;
        button{
            width: 140px;
            height: 40px;
            background: #169bd5;
            color: #fff;
            border-radius: 10px;
            font-size: 14px;
            margin-top: 30px;
            border: 0;
        }
    }
}




  
  
 
</style>
