<template>
<div class="changePd">
    <div class="oldpd">
        <p>旧密码</p><input type="text" >
    </div>
    <div class="newpd">
        <p>新密码</p><input type="text" >
    </div>
    <div class="again">
        <p>再次输入新密码</p><input type="text" >
    </div>
    <div class="storage">
        <button>保存</button>
    </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {};
  },
   components: {  }
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
    div{
        display: flex;
    }
    p{
        color:#676767;
    }
    input{
        width: 182px;
        height: 25px;
        border: 1px solid #b0b0b0;
    }
    .oldpd{
        width: 500px;
        height: 30px;
        line-height: 30px;
        margin-top: 40px;
        p{
            margin-right: 120px;
        }
    }
    .newpd{
        width: 500px;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
        p{
            margin-right: 120px;
        }
    }
    .again{
        width: 500px;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
        p{
            margin-right: 56px;
        }
    }
    .storage{
        width: 500px;
        height: 30px;
        line-height: 30px;
        margin-top: 40px;
        button{
            width: 70px;
            height: 27px;
            border: 1px solid #2793d4;
            color: #2793d4;
            margin-left: 167px;
            background: #fff;
            border-radius: 5px;
        }
    }
}



  
  
 
</style>
