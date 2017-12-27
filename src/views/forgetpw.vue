<template>
  <div class="lBox">
    <div class="leftB">
      <div class="phoneBox"><input type="text" v-model="phoneInput" @blur="phone" @focus="focus" placeholder="  请输入手机号码" class="phone">
        <span class="errorMsg">{{phoneMsg}}</span>
      </div>
      <div class="Verification"><input type="text" placeholder="  请输入验证码" @blur="imgBlur" @focus="imgVA" v-model="imgV">
        <div class="v-box"><img @click="reImg" :src="imgUrl" alt=""></div>
        <p class="errorMsg"> {{imgVMsg}}</p>
      </div>
      <div class="Verification">
        <input type="text" placeholder="  请输入验证码" v-model="phoneV" @blur="pVBlur" @focus="pVFocus">
        <button @click="clickGet">
          <span v-show="show">点击获取</span>
          <span v-show="!show" class="countdown">正在发送({{count}})</span>
        </button>
        <p class="errorMsg">{{pVMsg}}</p>
      </div>
      <div class="pwBox"><input :type="pwType" placeholder="  请输入新密码" @blur="pwShow" @focus="pwFocus" v-model="pwInput">
        <img class="visible" :src="invisibleUrl" @click="visible">
        <p class="errorMsg" v-show="pwMsg">请输入（8-20位）数字、大小写字母</p>
      </div>
      <div class="pwBox"><input :type="pwTypeI" placeholder="  请输入新密码" @blur="pwShowAgain" @focus="pwFocusAgain" v-model="pwI">
        <img class="visible" :src="invisibleUrlI" @click="visibleII">
        <p class="errorMsg" v-show="pwM">两次密码输入不一致</p>
      </div>

      <button class="confir" @click="confir">确认修改</button>

    </div>
    <div class="midB"></div>
    <div class="rightB">
      <p>想起密码来了？</p>
      <router-link class="ret" to="/outter/login">返回登录>></router-link>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
const eyes = [
  require("../assets/visible/invisible.png"),
  require("../assets/visible/visible.png")
]; //webpack的require
export default {
  data() {
    return {
      pwType: "password",
      pwTypeI: "password",
      phoneInput: "",
      phoneMsg: "",
      show: true,
      imgVMsg: "",
      imgV: "",
      pwInput: "",
      validationInput: "",
      phoneV: "",
      pVMsg: "",
      pwMsg: false,
      pwMSG: false,
      count: "",
      timer: null,
      pwI: "",
      pwM: false,
      imgUrl: "/xinda-api/ajaxAuthcode",
      invisibleUrl: eyes[0],
      invisibleUrlI: eyes[0]
    };
  },
  methods: {
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        this.phoneMsg = "";
        if (!result) {
          this.phoneMsg = "请输入正确手机号";
        }
      }
    },
    //重新获得焦点，提示框消失
    focus() {
      this.phoneMsg = "";
    },

    //图片验证码
    imgBlur() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgV);
      if (!imgVR && this.imgV !== "") {
        this.imgVMsg = "请输入正确的图片验证码";
      }
    },
    imgVA() {
      if (!this.imgV == "") {
        this.imgVMsg = "";
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
        this.imgV = "";
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
              imgCode: this.imgV
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
      if(this.phoneV != 111111){
        this.pVMsg = '短信验证码错误'
      }
    },
    pVFocus() {
      this.pVMsg = '';
    },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
      this.imgVMsg = "";
      this.imgV = "";
    },
    //密码验证
    pwShow() {
      let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
      let pwResult = pwReg.test(this.pwInput);
      if (!pwResult) {
        this.pwMsg = true;
        this.pwMSG = "";
      } else {
        this.pwMsg = false;
      }
    },
    pwFocus() {
      this.pwMsg = false;
    },
    //二次输入密码
    pwShowAgain() {
      if (this.pwI !== this.pwInput) {
        this.pwM = true;
      } else {
        this.pwM = false;
      }
    },
    pwFocusAgain() {
      this.pwM = false;
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
    visibleII() {
      this.pwTypeI = this.pwTypeI === "password" ? "text" : "password";
      if (this.pwTypeI == "password") {
        this.invisibleUrlI = eyes[0];
      } else {
        this.invisibleUrlI = eyes[1];
      }
    },

    //确认修改
    confir() {
      var md5 = require("md5");
      if (this.phoneInput != "") {
        if (this.imgV != "") {
          if (this.phoneV != 111111) {
            this.pVMsg = "短信验证码错误";
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
                  this.$router.push({ path: "/outter/login" });
                }
              });
          }
        } else {
          this.imgVMsg = "请输入验证码";
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
input {
  border: none;
  outline: 0;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
  margin-bottom: 19px;
  width: 281px;
  height: 34px;
  padding: 5px;
  box-sizing: border-box;
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
  margin: 0px auto;
  display: flex;
}
.leftB {
  width: 452px;
}
.confir {
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
  .ret {
    color: #409cd7;
    text-decoration: none;
    display: block;
    margin-left: 188px;
  }
  img {
    margin-left: 138px;
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

.visible {
  cursor: pointer;
  width: 17px;
  height: 12px;
  position: relative;
  top: 15px;
  right: 30px;
}
.countdown {
  color: #000;
}
</style>
