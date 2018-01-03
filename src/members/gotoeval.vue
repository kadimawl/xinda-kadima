<template>
<div class="gotoeval" @click="gotoevalclick">
    <!-- top标签 -->
    <div class="top">
        <p>评价</p>
    </div>
    <!-- 评价主体部分 -->
    <div class="bodyer">
        <!-- 商品详情 -->
        <div class="shangpin">
            <p class="sercode">服务单号：{{code}}</p>
            <p class="buycon">购买内容：{{cont}}</p>
            <p class="buytime">购买时间：{{btime}}</p>
        </div>
        <!-- 评价 -->
        <div class="eval">
            <p>评价：</p>
            <el-radio v-model="radio" label="1" >好评</el-radio>
            <el-radio v-model="radio" label="2" >中评</el-radio>
            <el-radio v-model="radio" label="3" >差评</el-radio>
        </div>
        <!-- 评分 -->
        <div class="score">
            <p>评分:</p>
            <el-rate v-model="score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </div>
        <!-- 评价具体内容 -->
        <div class="think">
            <p>感受：</p><textarea v-model="evalcont"></textarea>
        </div>
    </div>
    <!-- 提交 -->
    <div class="bot">
        <button @click="submit">提交</button>
    </div>
    <!-- 错误提示框 -->
    <div class="errorbox" v-if="errorshow"><p :style="{color:acolor}">{{error}}</p></div>
</div>
  
</template>

<script>
import {mapGetters,mapActions} from 'vuex' 
import {Radio,Rate} from 'element-ui';
export default {
    created(){//获得服务信息

        if(this.getEvaldetail.code){//验证是否空对象
            this.code=this.getEvaldetail.codes;
            this.cont=this.getEvaldetail.conts;
            this.btime=this.getEvaldetail.btimes;
        }
    },
    data() {
        return {
            code:'',//服务编号
            cont:'',//内容
            btime:'',//时间
            score:null,//得分
            radio:'',//评价
            errorshow:false,//
            acolor:'#ff4649',//
            error:'',//
            evalcont:'',//
        };
    },
    components:{
        [Radio.name]:Radio,
        [Rate.name]:Rate
    },
    computed:{
        ...mapGetters(['getEvaldetail']),
    },
    methods:{
        ...mapActions(['setEvaldetail']),
        // 提交按钮
        submit:function(){
            // console.log(this.radio,this.score,this.evalcont)
            if(this.getEvaldetail.code){
                if(this.radio!=1&&this.radio!=2&&this.radio!=3){
                    this.errorshow=true;
                    this.error='请选择评价';
                    return;
                }
                if(this.score==0){
                    this.errorshow=true;
                    this.error='请评分';
                    return;
                }
                var that=this;
                that.ajax.post('/xinda-api/service/judge/submit',that.qs.stringify({
                    id:that.getEvaldetail.code,
                    type:that.radio,
                    score:that.score,
                    content:that.evalcont,
                })).then(function(data){
                    if(data.data.status==1){
                        that.errorshow=true;
                        that.error='评价成功';
                        that.acolor='#5d95e8';
                        that.setEvaldetail({});
                        location.reload();
                    }else{
                        that.errorshow=true;
                        that.error=data.data.msg;
                    }
                })
            }
        },
        //页面点击
        gotoevalclick(){
            var that=this;
            if(this.errorshow==true){
                setTimeout(function(){
                    that.errorshow=false;
                },4000)
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
.gotoeval{
    width: 838px;
    height: 400px;
    margin: 30px 0 0 30px;
    // 顶部标签
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
    // 评价主体
    .bodyer{
        width: 100%;
        height: 300px;
        // 商品信息
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
        // 评价
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
            .el-radio{
                display: block;
                background: #fff;
                width: 100px;
                height: 20px;
                margin-right: 5px;
                margin-top: 8px;
            }
        }
        // 得分
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
        // 感受
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
    // 按钮
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
    // 错误框
    .errorbox{
        width: 200px;
        height: 100px;
        position: absolute;
        left: 1100px;
        top:340px;
        text-align: center;
        line-height: 100px;
        background: #f7f7f7;
        z-index:10;
        p{
            font-size: 18px;
        }
    }
}




  
  
 
</style>
