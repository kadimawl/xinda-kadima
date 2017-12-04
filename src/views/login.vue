<template>
  <div class="lOut">
    <div class="leftOut">
      <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="pFocus"><p class="errorMsg" v-show="!registered">该手机号已被注册</p>
      <input type="text" placeholder="  请输入密码" v-model="pwInput" @blur="pw" @focus="pwFocus"> <p class="errorMsg" v-show="pwShow">请输入（8-20位）数字、大小写字母</p>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><img  @click="reImg" :src="imgUrl" alt=""></div>
      <div class="forget"><a href="/#/outter/forgetpw">忘记密码？</a></div>
      <button @click="iLogin">立即登录</button>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">还没有账号？</p>
      <p class="immediately"><a href="/#/outter/register">立即注册>></a></p>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneInput: "",
      registered: true,
      pwInput: "",
      pwShow: false,
      imgUrl: "http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode"
    };
  },

  methods: {
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        this.registered = true;
        if (!result) {
          this.registered = false;
        }
      }
    },
    pFocus(){
      this.registered = true;
    },

    //密码输入验证
    pw() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if(!pwResult){
        this.pwShow = true;
      }
    },
    pwFocus() {
      this.pwShow = false;
    },
    //验证码刷新-
    reImg() {
      this.imgUrl =
        "http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode?r=" +
        Math.random()
          .toString()
          .substr(2, 4);
    },
    //立即登录
    iLogin() {
      var user = this.phoneInput;
      var pw = this.pwInput;
      if(!user == ''){
        if(window.localStorage){
          let storage = window.localStorage;
          if(storage.user){
          console.log(storage.user);
          }
          
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.lOut {
  margin: 0px auto 54px;
  width: 907px;
  height: 300px;
  display: flex;
  box-sizing: border-box;
  input {
    width: 281px;
    height: 37px;
    border: none;
    border: 1px solid #cbcbcb;
    border-radius: 3px;
    padding: 1px 0;
    outline: 0;
    margin-bottom: 24px;
  }
  .v-box {
    width: 281px;
    display: flex;
    img {
      height: 34px;
      margin-left: 9px;
    }
  }
  #verification {
    width: 172px;
  }
  .v-img {
    width: 85px;
    height: 35px;
    border: 1px solid;
  }
  .midOut {
    width: 1px;
    height: 260px;
    margin-top: 38px;
    background: #dadada;
  }
  .leftOut {
    padding: 9px 0 30px;
    box-sizing: border-box;
    width: 453px;
    button {
      width: 281px;
      height: 37px;
      color: #2693d4;
      background: #fff;
      font-size: 16px;
      border: none;
      border: 1px solid #2693d4;
      border-radius: 3px;
      outline: none;
      margin-top: 24px;
    }
    .forget {
      width: 281px;
      height: 20px;
      a {
        display: block;
        margin-top: 7px;
        font-size: 13px;
        color: #2693d4;
        text-decoration: none;
        line-height: 13px;
        float: right;
      }
    }
  }
  .rightOut {
    width: 453px;
    padding-left: 158px;
    box-sizing: border-box;
    .notYet {
      font-size: 16px;
      color: #000;
    }
    p {
      margin-left: 30px;
    }
    .immediately {
      margin: 23px 0 19px;
      a {
        margin-left: 30px;
        color: #2693d4;
        font-size: 17px;
        text-decoration: none;
      }
    }
  }
}
.errorMsg {
  width: 281px;
  height: 33px;
  border: 1px solid #f33;
  color: #f33;
  line-height: 33px;
  text-align: center;
  margin: 0 0 5px;
}
</style>
