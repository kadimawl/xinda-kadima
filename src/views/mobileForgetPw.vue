<template>
  <div>
    <mt-header title="忘记密码">
      <router-link to="/m/users/logined" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="lOut">
      <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone">
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
        <img @click="reImg" :src="imgUrl" alt="">
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="phoneV" @blur="pVBlur">
        <button class="clickGet" @click="clickGet">
          <span v-show="show">点击获取</span>
          <span class="countdown" v-show="!show">重新发送{{count}}</span>
        </button>
      </div>

      <input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput" @blur="pwBlur">

      <input type="text" placeholder="  请再次确认密码" @blur="pwShowAgain" v-model="validationInput">
      <button class="i-register" @click="submit">确认修改</button>

    </div>
  </div>

</template>

<script>
import { MessageBox } from "mint-ui";
let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
let pReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/;
export default {
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      imgUrl: "/xinda-api/ajaxAuthcode",
      phoneInput: "",
      imgVInput: "",
      phoneV: "",
      pwInput: "",
      seleCode: "",
      validationInput: ""
    };
  },
  methods: {
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        if (!result) {
          MessageBox.alert("请输入正确手机号", "提示");
        }
      }
    },

    //图片验证码
    imgVB() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgVInput);
      if (!imgVR && this.imgVInput !== "") {
        MessageBox.alert("请输入正确的图片验证码", "提示");
      }
    },
    imgVA() {
      if (!this.imgVInput == "") {
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
        this.imgVInput = "";
      }
    },
    //点击获取倒计时
    clickGet: function() {
      const TIME_COUNT = 60;
      if (this.phoneInput !== "" && this.imgV !== "") {
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
            if (data.data.status == 1) {
              this.pVMsg = "短信已成功发送";
            } else if (data.data.msg == "1分钟内请勿重复请求") {
              this.pVMsg = "1分钟内请勿重复请求";
            } else if (data.data.msg == "图片验证码错误！") {
              this.imgVMsg = "图片验证码错误！";
            }
          });
      }
    },
    pVBlur() {
      if (this.phoneV != 111111) {
        MessageBox.alert("短信验证码错误", "提示");
      }
    },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
      this.imgVInput = "";
    },
    //密码验证
    pwBlur() {
      let pwResult = pwReg.test(this.pwInput);
      if (!pwResult) {
        MessageBox.alert("密码为：8-20位数字，大小写字母", "提示");
      }
    },
    //二次输入密码
    pwShowAgain() {
      if (this.validationInput !== this.pwInput) {
        MessageBox.alert("两次密码输入不一致", "提示");
      }
    },
    //密码可视
    // visible() {
    //     this.pwType = this.pwType === "password" ? "text" : "password";
    //     if (this.pwType == "password") {
    //       this.invisibleUrl = eyes[0];
    //     } else {
    //       this.invisibleUrl = eyes[1];
    //     }
    //   },
    //   visibleII() {
    //     this.pwTypeI = this.pwTypeI === "password" ? "text" : "password";
    //     if (this.pwTypeI == "password") {
    //       this.invisibleUrlI = eyes[0];
    //     } else {
    //       this.invisibleUrlI = eyes[1];
    //     }
    //   },

    //确认修改
    submit() {
      var that = this;
      var md5 = require("md5");
      if (this.phoneInput != "") {
        if (this.imgV != "") {
          if (this.phoneV != 111111) {
            MessageBox.alert("短信验证码错误", "提示");
          } else {
            this.ajax
              .post(
                "/xinda-api/register/findpas",
                this.qs.stringify({
                  cellphone: this.phoneInput,
                  smsType: 1,
                  validCode: 111111,
                  password: md5(this.pwInput)
                })
              )
              .then(data => {
                if (data.data.status == 1) {
                  MessageBox.alert("修改成功").then(action => {
                    that.$router.push({ path: "/m/users/mobileLogin" });
                  });
                }
              });
          }
        } else {
          MessageBox.alert("请输入验证码", "提示");
        }
      } else {
        MessageBox.alert("请输入手机号提示", "提示");
      }
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
}
.lOut {
  width: 100%;
  margin: 0 auto;
  padding: 0.71rem 1.01rem 0 1.01rem;
  box-sizing: border-box;
  .v-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.32rem;
    img {
      width: 2.4rem;
      height: 0.6rem;
    }
    input {
      width: 2.72rem;
      margin: 0;
    }
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
input {
  display: block;
  width: 5.47rem;
  height: 0.75rem;
  border: none;
  border: 0.01rem solid #cbcbcb;
  border-radius: 0.03rem;
  padding: 0.22rem;
  outline: 0;
  box-sizing: border-box;
  margin-top: 0.32rem;
}

button {
  width: 5.5rem;
  height: 0.75rem;
  border: none;
  outline: 0;
  border-radius: 0.01rem;
  background: #2693d4;
  font-size: 0.26rem;
  color: #fff;
  font-weight: 400;
  line-height: 0.75rem;
  text-align: center;
}
.i-register {
  margin-top: 1.45rem;
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
  padding: 0 .01rem;
  position: relative;
  text-align: center;
  white-space: nowrap;
  button{
    width: .40rem;
  }
}
</style>

