<template>
<div class="acBody">
    <div class="nowtx">
        <p>当前头像：</p><img src="../assets/index/user.png" alt="">
    </div>
    <div class="name">
        <p>姓名：</p><el-input v-model="inputN" class="inputname" placeholder="请输入姓名"></el-input>
    </div>
    <div class="sex">
        <p>性别：</p><el-radio v-model="radio" label="1">男</el-radio><el-radio v-model="radio" label="2">女</el-radio>
    </div>
    <div class="mailbox" >
        <p>邮箱：</p><el-input v-model="inputM" class="inputname" placeholder="请输入邮箱"></el-input>
    </div>
    <div class="inarea">
        <p>所在地区:</p><v-distpicker province="北京市" city="北京市" area="海淀区"></v-distpicker>
    </div>
    <div class="storage">
        <button>保存</button>
    </div>
</div>
  
</template>

<script>
// 引入
import VDistpicker from 'v-distpicker'
import md5 from 'js-md5'

export default {
    created(){
        this.ajax.post('/xinda-api/member/info').then(function(data){
            console.log(data);
            if(data.data.status==1){
            console.log('succ');
                
            }else{
            console.log('false');
                
            }
        })
    },
    data() {
        return {
            inputN:'',
            inputM:'',
            radio:''
        };
    },
   components: {VDistpicker  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.acBody{
    width: 1000px;
    height: 450px;
    margin-left: 20px;
    .nowtx{
        width: 300px;
        height: 100px;
        display: flex;
        line-height: 100px;
        margin-left: 10px;
        margin-top: 30px;
        p{
            margin-right: 50px;
        }
    }
    .name{
        width: 400px;
        height: 40px;
        display: flex;
        margin-left: 10px;
        margin-top: 30px;
        p{
            width: 70px;
            line-height: 40px;
            margin-right: 45px;
        }
        .inputname{
            width: 180px;
        }
    }
    .sex{
        width: 400px;
        height: 30px;
        display: flex;
        line-height: 30px;
        margin-left: 10px;
        margin-top: 20px;
        .el-radio{
            font-size: 16px;
            line-height: 30px;
        }
        p{
            margin-right: 70px;
        }
    }
    .mailbox{
        width: 400px;
        height: 40px;
        display: flex;
        line-height: 40px;
        margin-left: 10px;
        margin-top: 20px;
        .el-input{
            width: 180px;
        }
        p{
            margin-right: 70px;
        }
    }
    .inarea{
        width: 800px;
        height: 50px;
        display: flex;
        margin-left: 10px;
        margin-top: 20px;
        line-height: 50px;
        p{
            margin-right: 50px;
        }
    }
    .storage{
        width: 400px;
        height: 50px;
        margin-left: 10px;
        margin-top: 25px;
        line-height: 50px;
        button{
            width: 70px;
            height: 27px;
            border: 1px solid #2793d4;
            color: #2793d4;
            margin-left: 116px;
            background: #fff;
            border-radius: 5px;
        }
    }
    
}




  
  
 
</style>
