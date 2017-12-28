<template>
  <div class="lOut">
    <div class="leftOut">
      <div class="phoneBox">
        <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="focus">
        <p class="errorMsg">{{phoneMsg}}</p>
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
        <img @click="reImg" :src="imgUrl" alt="">
        <p class="errorMsg">{{imgMsg}}</p>
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" class="verification" v-model="phoneV" @blur="pvBlur" @focus="pVFocus">
        <button class="clickGet" @click="clickGet">
          <span v-show="show">点击获取</span>
          <span class="countdown" v-show="!show">重新发送{{count}}</span>
        </button>
        <p class="errorMsg">{{pVMsg}}</p>
      </div>
      <div class="selected">
        <distpicker @selected="selected"></distpicker>
        <p class="errorMsg" v-show="addShow">请选择地址信息</p>
      </div>
      <div class="pwBox"><input :type="pwType" placeholder="  请输入密码" v-model="pwInput" @blur="pwBlur" @focus="pwFocus" class="pw">
        <img class="visible" :src="invisibleUrl" @click="visible">
        <p class="errorMsg exception">{{pwMsg}}</p>
      </div>
      <button class="i-register" @click="submit">立即注册</button>
      <p class="agree">注册即同意遵守
        <a href="jacascript:void(0)">《服务协议》</a>
      </p>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">已有账号？</p>
      <p class="immediately" @click="login">
        <router-link class="imLogin" to="/outter/login">立即登录>></router-link>
      </p>
      <img src="../assets/index/okmanr.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import distpicker from "@/components/distpicker";
const eyes = [
  require("../assets/visible/invisible.png"),
  require("../assets/visible/visible.png")
];
let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
export default {
  components: { distpicker },
  created() {},
  data() {
    return {
      phoneMsg: "", //手机号错误提示信息
      imgMsg: "", //图片验证码错误提示信息
      pwType: "password", //密码输入框是否可视
      pVMsg: "", //手机验证码提示信息
      pwMsg: "", //密码错误提示信息
      show: true,
      count: "",
      timer: null,
      imgUrl: "/xinda-api/ajaxAuthcode",
      phoneInput: "",
      imgVInput: "",
      phoneV: "",
      pwInput: "",
      seleCode: "",
      addShow: false,
      invisibleUrl: eyes[0]
    };
  },
  methods: {
    ...mapActions(["setTitle"]),
    //三级联动选择code
    selected: function(code) {
      this.seleCode = code;
    },
    login() {
      // this.$router.push({ path: "/outter/login" });
      this.setTitle("欢迎登录");
    },
    //手机号输入
    phone() {
      let pReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        this.phoneMsg = "";
        if (!result) {
          this.phoneMsg = "请输入正确的手机号";
        } else {
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
              if (data.data.status == -2) {
                this.phoneMsg = "该手机号已注册";
              }
            });
        }
      }
    },
    //重新获得焦点，提示框消失
    focus() {
      this.phoneMsg = "";
    },
    //图片验证码输入错误
    imgVB() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgVInput);
      if (!imgVR && this.imgVInput !== "") {
        this.imgMsg = "图片验证码为四位（数字或者字母）";
      }
    },
    imgVA() {
      if (this.imgVInput != "") {
        this.imgMsg = "";
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
        this.imgVInput = "";
      }
    },
    //点击获取倒计时
    clickGet: function() {
      const TIME_COUNT = 60;
      //短信验证码发送
      if (this.phoneInput !== "" && this.imgVInput !== "") {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.ajax
          .post(
            "/xinda-api/register/sendsms",
            this.qs.stringify({
              cellphone: this.phoneInput,
              smsType: 1,
              imgCode: this.imgVInput
            })
          )
          .then(data => {
            if (data.data.status == -1) {
              this.imgMsg = "图片验证码错误";
            }
          });
      }
    },

    //手机验证码输入验证
    pvBlur() {
      let pVReg = /^\d{6}$/;
      if (!pVReg.test(this.phoneV) && this.phoneV !== "") {
        this.pVMsg = "短信验证码为六位数字";
      } else if (this.phoneV != 111111) {
        this.pVMsg = "短信验证码错误";
      }
    },
    pVFocus() {
      this.pVMsg = "";
    },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
      this.imgVInput = "";
    },
    //密码输入验证
    pwBlur() {
      let pwResult = pwReg.test(this.pwInput);
      if (this.pwInput !== "") {
        if (!pwResult) {
          this.pwMsg = "密码为：8-20位数字，大小写字母";
        }
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
    //立即注册
    submit() {
      var user = this.phoneInput;
      var pw = this.pwInput;
      var md5 = require("md5");
      if (user != "") {
        if (this.imgVInput != "") {
          if (this.phoneV != "") {
            if (this.seleCode != "") {
              if (pw != "") {
                this.ajax
                  .post(
                    "/xinda-api/register/register",
                    this.qs.stringify({
                      cellphone: user,
                      smsType: 1,
                      validCode: 111111,
                      password: md5(pw),
                      regionId: this.seleCode
                    })
                  )
                  .then(data => {
                    if (data.data.status == 1) {
                      this.$router.push({ path: "/outter/login" });
                    } else {
                      this.phoneMsg = "请重新注册，谢谢。";
                    }
                  });
              } else {
                this.pwMsg = "请输入密码";
              }
            } else {
              this.addShow = true;
            }
          } else {
            this.pVMsg = "请输入短信验证码";
          }
        } else {
          this.imgMsg = "请输入图片验证码";
        }
      } else {
        this.phoneMsg = "请输入手机号";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.lOut {
  margin: 0px auto 24px;
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
    padding: 5px;
    box-sizing: border-box;
    outline: 0;
    margin-bottom: 19px;
  }
  .v-box {
    display: flex;
    img {
      height: 33px;
      margin-left: 9px;
    }
  }
  .clickGet {
    width: 100px;
    height: 39px;
    color: #2693d4;
    background: #fff;
    font-size: 12px;
    border: none;
    border: 1px solid #2693d4;
    border-radius: 3px;
    outline: none;
    margin-left: 9px;
  }
  #verification {
    width: 172px;
  }
  .verification {
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
    .pw {
      margin-top: 25px;
    }
    .i-register {
      width: 281px;
      height: 37px;
      color: #2693d4;
      background: #fff;
      font-size: 16px;
      border: none;
      border: 1px solid #2693d4;
      border-radius: 3px;
      outline: none;
      margin-top: 7px;
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
      .imLogin {
        margin-left: 30px;
        color: #2693d4;
        font-size: 17px;
        text-decoration: none;
      }
    }
  }
}
.agree {
  width: 281px;
  height: 14px;
  margin-top: 3px;
  line-height: 14px;
  font-size: 14px;
  text-align: center;
  color: #262626;
  a {
    text-decoration: none;
    color: #409cd7;
  }
}
.selected {
  display: flex;
  select {
    width: 88px;
    height: 33px;
    font-size: 12px;
    border: none;
    outline: 0;
    border: 1px solid #cbcbcb;
    border-radius: 3px;
    option {
      font-size: 12px;
    }
  }
}

.phoneBox {
  display: flex;
}
.pwBox {
  display: flex;
  input {
    position: relative;
  }
}
.visible {
  cursor: pointer;
  width: 17px;
  height: 12px;
  position: relative;
  top: 40px;
  right: 30px;
}
.errorMsg {
  height: 12px;
  font-size: 12px;
  color: #f33;
  line-height: 12px;
  display: inline-block;
  margin-top: 11px;
  margin-left: 10px;
}
.exception {
  margin-top: 35px;
}
.countdown {
  color: #000;
}
</style>
