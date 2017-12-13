<template>
  <div class="lBox">
    <div class="leftB">
      <div class="phoneBox"><input type="text" v-model="phoneInput" @blur="phone" @focus="focus" placeholder="  请输入手机号码" class="phone">
        <span class="errorMsg" v-show="!pshow">请输入正确手机号</span>
      </div>
      <div class="Verification"><input type="text" placeholder="  请输入验证码" @blur="imgBlur" @focus="imgVA" v-model="imgV">
        <div class="v-box"><img @click="reImg" :src="imgUrl" alt=""></div>
        <p class="errorMsg" v-show="!imgShow">请输入正确的图片验证码</p>
      </div>
      <div class="Verification"><input type="text" placeholder="  请输入验证码">
        <button @click="clickGet">
          <span v-show="show">点击获取</span>
          <span v-show="!show" class="countdown">正在发送({{count}})</span>
          <p class="errorMsg" v-show="vShow">1分钟内请勿重复请求</p>
        </button>
      </div>
      <div class="pwBox"><input type="text" placeholder="  请输入新密码" @blur="pwShow" @focus="pwFocus" v-model="pwInput">
        <p class="errorMsg" v-show="pwMsg">请输入（8-20位）数字、大小写字母</p>
      </div>
      <div class="pwBox"><input type="text" placeholder="  请输入新密码" @blur="pwShowAgain" @focus="pwFocusAgain" v-model="pwI">
        <p class="errorMsg" v-show="pwM">两次密码输入不一致</p>
      </div>

      <button class="confir" @click="confir">确认修改</button>

    </div>
    <div class="midB"></div>
    <div class="rightB">
      <p>想起密码来了？</p>
      <a href="/#/outter/login">返回登录>></a>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneInput: "",
      show: true,
      pshow: true,
      imgShow: true,
      imgV: "",
      pwInput: "",
      validationInput: "",
      pwMsg: false,
      pwMSG: false,
      count: "",
      timer: null,
      pwI: "",
      pwM: false,
      vShow: false,
      imgUrl: "/xinda-api/ajaxAuthcode"
    };
  },
  methods: {
    //手机号输入验证
    phone() {
      let pReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      let result = pReg.test(this.phoneInput);
      if (!this.phoneInput == "") {
        this.pshow = true;
        if (!result) {
          this.pshow = false;
        }
      }
    },
    //重新获得焦点，提示框消失
    focus() {
      this.pshow = true;
    },

    //图片验证码
    imgBlur() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgV);
      if (!imgVR && this.imgV !== "") {
        this.imgShow = false;
      }
    },
    imgVA() {
      if (!this.imgV == "") {
        this.imgShow = true;
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
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
              console.log(data.data.msg)
            } else if (data.data.msg == "1分钟内请勿重复请求") {
              this.vShow = true;
            } else if (data.data.msg == "图片验证码错误！") {
              this.imgShow = false;
            }
          });
      }
    },

    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
      this.imgShow = true;
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

    //确认修改
    confir() {
      var md5 = require("md5");
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
.countdown {
  color: #000;
}
</style>
