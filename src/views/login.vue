<template>
  <div class="lOut">
    <div class="leftOut">
      <div class="phoneBox">
        <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="pFocus">
        <p class="errorMsg">{{phoneMsg}}</p>
      </div>
      <div class="pwBox">
        <input :type="pwType" placeholder="请输入密码" v-model="pwInput" @blur="pw" @focus="pwFocus">
        <img class="visible" :src="invisibleUrl" @click="visible">
        <p class="errorMsg">{{pwMsg}}</p>
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
        <img @click="reImg" :src="imgUrl" alt="">
        <p class="errorMsg">{{imgVMsg}} </p>
      </div>
      <div class="forget" @click="forgetpw">
        <router-link class="fpw" to="/outter/forgetpw">忘记密码？</router-link>
      </div>

      <button @click="iLogin">立即登录</button>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">还没有账号？</p>
      <p class="immediately" @click="register">
        <router-link class="imt" to="/outter/register">立即注册>></router-link>
      </p>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const eyes = [
  require("../assets/invisible.png"),
  require("../assets/visible.png")
];
export default {
  created() {
    var shoppingID = this.$route.query.id;
  },
  data() {
    return {
      pwType: "password",
      phoneInput: "",
      phoneMsg: "",
      pwInput: "",
      pwMsg: "",
      imgVInput: "",
      imgVMsg: "",
      imgUrl: "/xinda-api/ajaxAuthcode",
      invisibleUrl: eyes[0],
      EShow: false
    };
  },

  methods: {
    ...mapActions(["setTitle", "setName"]),
    forgetpw() {
      this.setTitle("忘记密码");
    },
    register() {
      this.setTitle("欢迎注册");
    },
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      let user = this.phoneInput;
      if (!this.phoneInput == "") {
        //验证手机号是否已经注册
          this.ajax
            .post(
              "/xinda-api/register/valid-sms",
              this.qs.stringify({
                cellphone: this.phoneInput,
                smsType: 1,
                validCode: 111111
              })
            )
            .then(data => {
              if (data.data.status != -2) {
                this.phoneMsg = "该手机号未注册";
              }else{
                this.phoneMsg = '';
              }
            });
        if (!result) {
          this.phoneMsg = "请输入正确的手机号";
          let user = this.phoneInput;
        }
      }
    },
    pFocus() {
      this.phoneMsg = "";
    },

    //密码输入验证
    pw() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if (!pwResult && this.pwInput !== "") {
        this.pwMsg = "请输入（8-20位）数字、大小写字母";
      }
    },
    pwFocus() {
      this.pwMsg = "";
    },
    //密码可视
    visible() {
      this.pwType = this.pwType === "password" ? "text" : "password";
      if (this.pwType == "password") {
        this.invisibleUrl = eyes[0];
      } else {
        this.invisibleUrl = eyes[1];
      }
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
        this.imgVMsg = "图片验证码为4位（数字或者大小写字母）";
      }
    },
    imgVA() {
      if (this.imgVInput !== "") {
        this.imgVMsg = "";
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
        this.imgVInput = "";
      }
    },

    //立即登录
    iLogin() {
      var md5 = require("md5");
      let userName = this.phoneInput;
      let pw = this.pwInput;
      let storage = window.sessionStorage;
      if (userName != "") {
        if (pw != "") {
          if (this.imgVInput != "") {
            this.ajax
              .post(
                "/xinda-api/sso/login",
                this.qs.stringify({
                  loginId: userName,
                  password: md5(this.pwInput),
                  imgCode: this.imgVInput
                })
              )
              .then(data => {
                let msg = data.data.msg;
                let status = data.data.status;
                if (status == 1) {
                  //成功登陆
                  sessionStorage.setItem("user", this.phoneInput);
                  this.$router.push({
                    path: this.$route.query.redirect || "/HomePage",
                    query: { shoppingId: this.$route.query.id }
                  });
                  this.ajax.post("/xinda-api/sso/login-info").then(data => {
                    // console.log(data);
                    let name = data.data.data.name;
                    this.setName(this.phoneInput);
                  });
                } else if (status == -1) {
                  if (msg == "图片验证码错误！") {
                    this.imgVMsg = "图片验证码错误！";
                  } else if (msg == "账号或密码不正确！") {
                    this.phoneMsg = "账号或密码不正确！";
                  } else if (msg == "账号不存在") {
                    this.phoneMsg = "该手机号未注册";
                  }
                }
              });
          } else {
            this.imgVMsg = "请输入验证码";
          }
        } else {
          this.pwMsg = "请输入密码";
        }
      } else {
        this.phoneMsg = "请输入手机号";
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
    position: relative;
    padding: 5px;
    box-sizing: border-box;
  }
  .visible {
    cursor: pointer;
    width: 17px;
    height: 12px;
    position: relative;
    top: 15px;
    right: 30px;
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
      .fpw {
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
      .imt {
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
  width: 130px;
  height: 12px;
  font-size: 12px;
  color: #f33;
  line-height: 12px;
  display: inline-block;
  margin-top: 11px;
  margin-left: 10px;
}
</style>
