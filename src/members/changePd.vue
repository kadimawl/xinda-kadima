<template>
<div class="changePd" @click="changePdclick">
    <!-- 旧密码 -->
    <div class="oldpd">
        <p>旧密码</p>
        <el-input v-model="inputoldpd" class="inputoldpd" placeholder="请输入旧密码" @blur="oldpdB"></el-input>
        <span class="mark" :style="{color:colorOld}">*</span>
    </div>
    <!-- 新密码 -->
    <div class="newpd">
        <p>新密码</p>
        <el-input v-model="inputnewpd" class="inputnewpd" placeholder="请输入新密码" @blur="newpdB"></el-input>
        <span class="mark" :style="{color:colorNew}">*</span>
    </div>
    <!-- 再次输入新密码 -->
    <div class="again">
        <p>再次输入新密码</p>
        <el-input v-model="inputagain" class="inputagain" placeholder="请再次输入新密码" @blur="againB"></el-input>
        <span class="mark" :style="{color:colorAgain}">*</span>
    </div>
    <!-- 保存按钮 -->
    <div class="storage">
        <button>保存</button>
    </div>
    <!-- 错误提示框 -->
    <div class="errorbox" v-if="errorshow"><p :style="{color:acolor}">{{error}}</p></div>
</div>
  
</template>

<script>
export default {
    created(){
        this.errorshow=false;
    },
    data() {
        return {
            inputoldpd:'',//
            inputnewpd:'',//
            inputagain:'',//
            colorOld:'#ff4649',//
            colorNew:'#ff4649',//
            colorAgain:'#ff4649',//
            acolor:'#ff4649',//错误提示的颜色
            errorshow:false,//控制错误框
            error:'',//错误提示
        };
    },
    components: {},
    methods:{
        // 页面点击事件
        changePdclick(){

        }
    }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.changePd{
    width: 800px;
    height: 300px;
    margin-left: 20px;
    // 一级盒子通用样式
    >div{
        display: flex;
        width: 500px;
        height: 50px;
        line-height: 50px;
    }
    // 所有p标签
    p{
        margin-left: 20px;
        color:#676767;
    }
    // 所有输入框
    .el-input{
        width: 200px;
        input{
            width: 200px;
            height: 25px;
            border: 1px solid #b0b0b0;
        }
    }
    // 旧密码
    .oldpd{
        margin-top: 40px;
        p{
            margin-right: 120px;
        }
    }
    // 新密码
    .newpd{
        margin-top: 20px;
        p{
            margin-right: 120px;
        }
    }
    // 再次输入新密码
    .again{
        margin-top: 20px;
        p{
            margin-right: 56px;
        }
    }
    // 保存
    .storage{
        margin-top: 40px;
        button{
            width: 87px;
            height: 33px;
            border: 1px solid #2793d4;
            color: #2793d4;
            margin-left: 190px;
            background: #fff;
            border-radius: 5px;
            font-size: 18px;
        }
    }
    // 错误提示
    .errorbox{
        width: 200px;
        height: 60px;
        position: fixed;
        left: 1100px;
        top:400px;
        text-align: center;
        line-height: 60px;
        background: #f7f7f7;
        z-index:10;
        p{
            font-size: 18px;
        }
    }
    // 标记
    .mark{
        display: block;
        margin-left: 10px;
    }
}
</style>
