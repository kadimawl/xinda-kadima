<template>
  <div>
    <div class="box">
      <div class="errorMSG" v-show="msg"><img src="../assets/mobile/error.jpg" alt=""><p>{{msg}}</p></div>
      <div class="phoneBox">
        <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="pFocus">
        <!-- <p class="errorMsg">{{phoneMsg}}</p> -->
      </div>
      <div class="pwBox">
        <input type="text" placeholder="  请输入密码" v-model="pwInput" @blur="pw" @focus="pwFocus">
        <!-- <p class="errorMsg">{{pwMsg}}</p> -->
      </div>
      <div class="v-box">
        <!-- <div> -->
          <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
          <img @click="reImg" :src="imgUrl" alt="">
        <!-- </div> -->
        <!-- <p class="errorMsg">{{imgVMsg}}</p> -->
      </div>
      <button @click="iLogin">立即登录</button>
    </div>
    <div class="box-4d">
      <div class="left">还没有信达账号</div>
      <a href="/#/m/users/mobileRegister">立即注册</a>
    </div>
  </div>
</template>

<script>
let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var md5 = require('md5');
export default {
  data() {
    return {
      msg: '',
      phoneInput: "", //手机号
      phoneMsg: "",
      pwInput: "", //密码
      pwType: "password",
      pwMsg: "",
      imgVInput: "", //验证码
      imgVMsg: '',
      imgUrl: "/xinda-api/ajaxAuthcode"
    };
  },
  methods: {
    phone() {
      let pResult = pReg.test(this.phoneInput);
      if (this.phoneInput != "") {
        if (!pResult) {
          this.phoneMsg = "请输入正确的手机号";
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
        this.pwMsg = "请输入8-20位数字、大小写字母";
      }
    },
    pwFocus() {
      this.pwMsg = "";
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
    iLogin() {
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
                  // sessionStorage.setItem("user", this.phoneInput);
                  this.$router.push({ path: "/m" }); //页面跳转
                  this.ajax.post("/xinda-api/sso/login-info").then(data => {
                    let name = data.data.data.name;
                    // this.setName(this.phoneInput);
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

<style lang="less">
.box {
  // max-width: 768px;
  // max-height: 1280px;
  width: 100%;
  margin: 0 auto;
  // padding: 0 13%;
  box-sizing: border-box;
}
input {
  width: 547px;
  height: 75px;
  margin: 0 auto;
}

.v-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  div {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 60%;
  }
  img {
    width: 35%;
  }
}
button {
  display: block;
  width: 550px;
  height: 75px;
  margin-top: 213px;
  font-size: 27px;
  font-weight: 400;
  color: #fff;
  outline: 0;
  background: #2693d4;
  text-align: center;
  line-height: 75px;
  border: none;
  margin: 0 auto;
}

.box-4d {
  height: 48px;
  background: #4d4d4d;
  max-width: 768px;
  margin: 334px auto 0;
  display: flex;
  .left {
    width: 36%;
    font-size: 25px;
    color: #f8f8f8;
    text-align: right;
    line-height: 48px;
  }
  a {
    display: inline-block;
    width: 24%;
    height: 35px;
    background: #2693d4;
    text-align: center;
    line-height: 35px;
    text-decoration: none;
    font-size: 25px;
    color: #fff;
    margin: auto 0 auto 35%;
  }
}
.errorMsg {
  width: 16%;
  height: 40px;
  font-size: 13px;
  color: #f33;
  line-height: 15px;
  display: inline-block;
  margin-left: 3px;
}
</style>

