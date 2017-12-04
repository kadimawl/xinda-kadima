<template>
  <div class="lBox">
    <div class="leftB">
      <input type="text" v-model="phoneInput" @blur="phone" placeholder="  请输入手机号码" class="phone">
      <div class="Verification"><input type="text" placeholder="  请输入验证码"><div class="v-box"><img src="http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode" alt=""></div></div>
      <div class="Verification"><input type="text" placeholder="  请输入验证码"><button>点击获取</button></div>
      <input type="text" placeholder="  请输入新密码" >
      <input type="text" placeholder="  请再次确认密码">
      <button class="confirm" >确认修改</button>
      
    </div>
    <div class="midB"></div>
    <div class="rightB">
      <p>想起密码来了？</p>
      <a href="/#/login">返回登录>></a>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneInput: '',
    };
  },
  methods: {
    //手机号输入验证
    phone() {
      console.log(this)
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(Number(this.phoneInput));
    },
    //密码输入验证
    pw() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
    },
  }
};


//手机号正则
var pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
input {
  display: block;
  border: none;
  outline: 0;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
  margin-bottom: 19px;
  width: 281px;
  height: 34px;
}
.v-box {
  margin-left: 9px;
}
.Verification {
  display: flex;
  input {
    width: 172px;
  }
  button {
    width: 98px;
    height: 36px;
    background: #fff;
    border: none;
    border: 1px solid #2693d4;
    color: #2693d4;
    border-radius: 3px;
    margin-left: 9px;
    outline: 0;
  }
}
.lBox {
  width: 905px;
  margin: 54px auto;
  display: flex;
}
.leftB {
  width: 452px;
}
.confirm {
  width: 281px;
  height: 36px;
  background: #fff;
  border: none;
  border: 1px solid #2693d4;
  color: #2693d4;
  border-radius: 3px;
  outline: 0;
}

.midB {
  width: 1px;
  height: 261px;
  margin-top: 29px;
  background: #cbcbcb;
  // padding-left: 138px;
  box-sizing: border-box;
}
.rightB {
  font-size: 17px;
  p {
    color: #000;
    line-height: 17px;
    margin-bottom: 23px;
    margin-left: 188px;
  }
  a {
    color: #409cd7;
    text-decoration: none;
    display: block;
    margin-left: 188px;
  }
  img {
    margin-left: 138px;
  }
}
</style>
