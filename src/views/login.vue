<template>
  <div class="lOut">
    <div class="leftOut">
      <div class="phoneBox"><input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="pFocus">
        <p class="errorMsg" v-show="!registered">该手机号未注册</p>
        <p class="errorMsg" v-show="!correctness">请输入正确的手机号</p>
      </div>
      <div class="pwBox"><input type="text" placeholder="  请输入密码" v-model="pwInput" @blur="pw" @focus="pwFocus">
        <p class="errorMsg" v-show="pwShow">请输入（8-20位）数字、大小写字母</p>
        <p class="errorMsg" v-show="pwEShow">手机号或者密码输入错误</p>
      </div>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA"><img @click="reImg" :src="imgUrl" alt="">
        <p class="errorMsg" v-show="imgShow">图片验证码为4位（数字或者大小写字母）</p>
        <p class="errorMsg" v-show="imgShowError">图片验证码错误！</p>
      </div>
      <div class="forget" @click="forgetpw">
        <a href="/#/outter/forgetpw">忘记密码？</a>
      </div>
      <p  class="errorMsg" v-show="EShow">账号或密码不正确！</p>
      <button @click="iLogin">立即登录</button>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">还没有账号？</p>
      <p class="immediately" @click="register">
        <a href="/#/outter/register">立即注册>></a>
      </p>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
var md5 = require("md5");

import { mapActions } from "vuex";

export default {
  data() {
    return {
      phoneInput: "",
      registered: true,
      correctness: true,
      pwInput: "",
      pwShow: false,
      pwEShow: false,
      imgVInput: "",
      imgUrl: "/xinda-api/ajaxAuthcode",
      imgShow: false,
      imgShowError: false,
      EShow: false
    };
  },

  methods: {
    ...mapActions(["setTitle",'setName']),
    forgetpw() {
      // this.$router.push({ path: "/outter/forgetpw" });
      this.setTitle("忘记密码");
    },
    register() {
      // this.$router.push({ path: "/outter/register" });
      this.setTitle("欢迎注册");
    },
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      let user = this.phoneInput;
      if (!this.phoneInput == "") {
        this.correctness = true;
        if (!result) {
          this.correctness = false;
          let user = this.phoneInput;
        }
      }
    },
    pFocus() {
      this.correctness = true;
    },

    //密码输入验证
    pw() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if (!pwResult && this.pwInput !== "") {
        this.pwShow = true;
      }
    },
    pwFocus() {
      this.pwShow = false;
    },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
    },
    //验证码输入校验
    imgVB() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgVInput);
      if (!imgVR && this.imgVInput !== "") {
        this.imgShow = true;
      }
    },
    imgVA() {
      if (this.imgVInput !== "") {
        this.imgShow = false;
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
      }
    },

    //立即登录
    iLogin() {
      let user = this.phoneInput;
      this.ajax
        .post(
          "/xinda-api/sso/login",
          this.qs.stringify({
            loginId: user,
            password: md5(this.pwInput),
            imgCode: this.imgVInput
          })
        )
        .then(data => {
          let msg = data.data.msg;
          let status = data.data.status;
          console.log(msg, status);

          if (status == 1) {
            this.$router.push({ path: "/HomePage" }); //页面跳转
            // this.ligined = true;
            this.ajax.post("/xinda-api/sso/login-info").then(data => {
              let name =  data.data.data.name;
              if(name !==''){
                console.log(name);
                this.setName(name) ;
              }
            });
          } else if (status == -1) {
            if(msg=='图片验证码错误！'){
              this.imgShowError = true;
            }else if(msg=='账号或密码不正确！') {
              this.EShow = true;
            }else if(msg=='账号不存在'){
               this.registered = false;
            }
          }
        });
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
    // width: 281px;
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
      height: 13px;
      a {
        display: block;
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
.phoneBox {
  display: flex;
}
.pwBox {
  display: flex;
}
.errorMsg {
  width: 281px;
  height: 12px;
  font-size: 12px;
  color: #f33;
  line-height: 12px;
  display: inline-block;
  margin-top: 11px;
  margin-left: 10px;
}
</style>
