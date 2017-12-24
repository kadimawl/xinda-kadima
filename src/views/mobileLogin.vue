<template>
  <div>
    <mt-header title="登录">
      <router-link to="/m/users/mobile" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    
    <div class="box">

      <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone">
      <input type="text" placeholder="  请输入密码" v-model="pwInput" @blur="pw">
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
        <img @click="reImg" :src="imgUrl" alt="">
      </div>
      <button class="btn" @click="iLogin">立即登录</button>
    </div>
    <div class="box-4d">
      <div class="left">还没有信达账号</div>
      <a href="/#/m/users/mobileRegister">立即注册</a>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";

let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var md5 = require("md5");
export default {
  data() {
    return {
      msg: "",
      phoneInput: "", //手机号
      pwInput: "", //密码
      pwType: "password",
      imgVInput: "", //验证码
      imgUrl: "/xinda-api/ajaxAuthcode"
    };
  },
  methods: {
    phone() {
      let pResult = pReg.test(this.phoneInput);
      if (this.phoneInput != "") {
        if (!pResult) {
          MessageBox({
            title: "Notice",
            message: "请输入正确的手机号",
            showCancelButton: true
          });
        }
      }
    },
    //密码输入验证
    pw() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if (!pwResult && this.pwInput !== "") {
        MessageBox({
          title: "Notice",
          message: "请输入20位数字、大小写字母",
          showCancelButton: true
        });
      }
    },
    //密码可视
    // visible() {
    //   this.pwType = this.pwType === "password" ? "text" : "password";
    //   if (this.pwType == "password") {
    //     this.invisibleUrl = eyes[0];
    //   } else {
    //     this.invisibleUrl = eyes[1];
    //   }
    // },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
    },
    //验证码输入校验
    imgVB() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgVInput);
      if (!imgVR && this.imgVInput !== "") {
        MessageBox({
          title: "Notice",
          message: "图片验证码为4位（数字或者大小写字母）",
          showCancelButton: true
        });
      }
    },
    imgVA() {
      if (this.imgVInput !== "") {
        this.imgVMsg = "";
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
        this.imgVInput = "";
      }
    },
    iLogin() {
      var that = this;
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
                console.log(msg);
                if (status == 1) {
                  //成功登陆
                  MessageBox.confirm("登录成功").then(function() {
                    // sessionStorage.setItem("user", this.phoneInput);
                    that.$router.push({ path: "/m" }); //页面跳转
                    that.ajax.post("/xinda-api/sso/login-info").then(data => {
                      let name = data.data.data.name;
                      // this.setName(this.phoneInput);
                    });
                  });
                } else if (status == -1) {
                  if (msg == "图片验证码错误！") {
                    MessageBox({
                      title: "Notice",
                      message: "图片验证码错误！",
                      showCancelButton: true
                    });
                  } else if (msg == "账号或密码不正确！") {
                    MessageBox({
                      title: "Notice",
                      message: "账号或密码不正确！",
                      showCancelButton: true
                    });
                  } else if (msg == "账号不存在") {
                    MessageBox({
                      title: "Notice",
                      message: "该手机号未注册",
                      showCancelButton: true
                    });
                  }
                }
              });
          } else {
            MessageBox({
              title: "Notice",
              message: "请输入验证码",
              showCancelButton: true
            });
            this.imgVMsg = "请输入验证码";
          }
        } else {
          MessageBox({
            title: "Notice",
            message: "请输入密码",
            showCancelButton: true
          });
        }
      } else {
        MessageBox({
          title: "Notice",
          message: "请输入手机号",
          showCancelButton: true
        });
      }
    }
  }
};
</script>

<style lang="less">
.box {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}
.head {
  width: 100%;
  height: 0.77rem;
  background: #e5e5e5;
  margin-bottom: 0.39rem;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.77rem;
}
input {
  display: block;
  width: 5.47rem;
  height: 0.75rem;
  margin: 0.32rem auto 0;
}
.v-box {
  width: 5.47rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  margin-bottom: 2.13rem;
  input {
    width: 2.72rem;
    margin: 0;
  }
  img {
    width: 2.4rem;
    height: 0.5rem;
    margin: auto 0;
  }
}
.btn {
  display: block;
  width: 5.5rem;
  height: 0.75rem;
  font-size: 0.27rem;
  font-weight: 400;
  color: #fff;
  outline: 0;
  background: #2693d4;
  text-align: center;
  line-height: 0.75rem;
  border: none;
  margin: 0 auto;
}

.box-4d {
  width: 100%;
  height: 0.78rem;
  background: #4d4d4d;
  margin: 5.34rem auto 0;
  display: flex;
  .left {
    width: 2.75rem;
    height: 0.78rem;
    font-size: 0.28rem;
    color: #f8f8f8;
    text-align: right;
    line-height: 0.78rem;
  }
  a {
    display: inline-block;
    width: 1.48rem;
    height: 0.49rem;
    background: #2693d4;
    text-align: center;
    line-height: 0.49rem;
    text-decoration: none;
    font-size: 0.25rem;
    color: #fff;
    margin: auto 0 auto 2.6rem;
  }
}

.mint-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #e5e5e5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    height: 40px;
    line-height: 1;
    padding: 0 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
}
</style>

