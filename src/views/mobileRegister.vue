<template>
  <div>
    <mt-header title="注册">
      <router-link to="/m/users/mobile" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="lOut">

      <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone">
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB">
        <img @click="reImg" :src="imgUrl" alt="">
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="phoneV" @blur="pvBlur">
        <button class="clickGet" @click="clickGet">
          <span v-show="show">点击获取</span>
          <span class="countdown" v-show="!show">重新发送{{count}}</span>
        </button>
      </div>
      <div class="selected">
        <distpicker @selected="selected"></distpicker>
      </div>
      <input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput" @blur="pwBlur">
      <button class="i-register" @click="submit">立即注册</button>

    </div>
  </div>

</template>

<script>
import distpicker from "@/components/distpicker";
import { MessageBox } from "mint-ui";
export default {
  components: { distpicker },
  data() {
    return {
      phoneInput: "", //手机号
      show: true,
      count: "",
      timer: null,
      imgUrl: "/xinda-api/ajaxAuthcode",
      imgVInput: "",
      phoneV: "", //手机验证码
      pwInput: "", //密码
      seleCode: ""
    };
  },
  methods: {
    selected: function(code) {
      this.seleCode = code;
      console.log(this.seleCode);
    },
    login() {
      this.setTitle("欢迎登录");
    },
    //手机号输入
    phone() {
      let pReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        this.phoneMsg = "";
        if (!result) {
          MessageBox.alert("请输入正确的手机号", "提示");
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
                MessageBox.alert("该手机号已注册", "提示");
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
        MessageBox({
          title: "提示",
          message: "图片验证码为四位（数字或者字母）",
          showCancelButton: true
        });
        MessageBox.alert("图片验证码为四位（数字或者字母）", "提示");
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
              MessageBox.alert("图片验证码错误", "提示");
            }
          });
      }
    },

    //手机验证码输入验证
    pvBlur() {
      let pVReg = /^\d{6}$/;
      if (!pVReg.test(this.phoneV) && this.phoneV !== "") {
        MessageBox.alert("短信验证码为六位数字", "提示");
      } else if (this.phoneV != 111111) {
        MessageBox.alert("短信验证码错误", "提示");
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
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if (this.pwInput !== "") {
        if (!pwResult) {
          MessageBox.alert("密码为：8-20位数字，大小写字母", "提示");
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
      var that =this;
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
                      MessageBox.alert("您已注册成功").then(action => {
                        that.$router.push({ path: "/outter/login" });
                      });
                    } else {
                      MessageBox.alert("请重新注册，谢谢。", "提示");
                    }
                  });
              } else {
                MessageBox.alert("请输入密码", "提示");
              }
            } else {
              this.addShow = true;
            }
          } else {
            MessageBox.alert("请输入短信验证码", "提示");
          }
        } else {
          MessageBox.alert("请输入图片验证码", "提示");
        }
      } else {
        MessageBox.alert("请输入手机号。", "提示");
      }
    }
  }
};
</script>

<style lang="less">
.lOut {
  padding: 0.71rem 1rem 4.62rem 1.01rem;
  box-sizing: border-box;
}
input {
  width: 5.47rem;
  height: 0.75rem;
  border: none;
  border: 0.01rem solid #cbcbcb;
  border-radius: 0.03rem;
  outline: 0;
  margin-bottom: 0.32rem;
}
.v-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.32rem;
  input {
    width: 2.72rem;
    margin: 0;
  }
  img {
    width: 2.4rem;
    height: 0.5rem;
    margin: auto 0;
  }
  .clickGet {
    width: 2.4rem;
    height: 0.75rem;
    color: #fff;
    background: #2693d4;
    font-size: 0.28rem;
    border: none;
    border-radius: 0.03rem;
    outline: none;
    line-height: 0.75rem;
  }
}

.selected {
  width: 100%;
  height: 0.76rem;
  div {
    display: flex;
    justify-content: space-between;
    select {
      width: 1.67rem !important;
      height: 0.75rem !important;
      outline: 0;
      color: #b4b4b4;
      font-size: 0.28rem !important;
      option {
        font-size: 0.25rem;
      }
    }
  }
}

.pwBox {
  margin: 0.32rem 0 1.45rem;
  width: 100%;
  input {
    width: 100%;
  }
}
button {
  width: 100%;
  height: 0.75rem;
  border: none;
  border: 0.01rem solid #2693d4;
  border-radius: 0.01rem;
  background: #2693d4;
  font-size: 0.26rem;
  color: #fff;
  font-weight: 400;
  line-height: 0.75rem;
  text-align: center;
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
  font-size: 0.28rem;
  height: 40px;
  line-height: 1;
  padding: 0 0.01rem;
  position: relative;
  text-align: center;
  white-space: nowrap;
  button {
    width: 0.4rem;
  }
}
</style>

