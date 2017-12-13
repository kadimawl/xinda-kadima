<template>
  <div class="lOut">
    <div class="leftOut">
      <div class="phoneBox"><input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="focus">
        <p class="errorMsg" v-show="!pshow">请输入正确手机号</p>
        <p class="errorMsg" v-show="!rshow">该手机号已注册</p>
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
        <img @click="reImg" :src="imgUrl" alt="">
        <p class="errorMsg" v-show="!imgShow">图片验证码为四位（数字或者字母）</p>
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="phoneV" @blur="pvBlur" @focus="pVFocus">
        <button class="clickGet" @click="clickGet">
          <span v-show="show">点击获取</span>
          <span class="countdown" v-show="!show">重新发送{{count}}</span>
        </button>
        <p class="errorMsg" v-show="!pVShow">验证码为六位数字</p>
      </div>
      <div class="selected">
        <v-distpicker id="select" province="省" city="市"  @selected="selected" ></v-distpicker>
          <!-- <select name="" id="" @change="proChange" v-model="province">
            <option value="0">省</option>
            <option :value="code" v-for="(province,code) in provinces" :key="province.code">{{province}}</option>
          </select>
          <select name="" id=""  @change="cityChange" v-model="city">
            <option value="0">市</option>
            <option :value="code" v-for="(city,code) in citys" :key="city.code">{{city}}</option>
          </select>
          <select name="" id="">
            <option value="0">区</option>
            <option :value="code" v-for="(area,code) in areas" :key="area.code">{{area}}</option>
          </select> -->
      </div>
      <div class="pwBox"><input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput" @blur="pwBlur" @focus="pwFocus">
        <p class="errorMsg exception" v-show="pwShow">密码为：8-20位数字，大小写字母</p>
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
        <a href="/#/outter/login">立即登录>></a>
      </p>
      <img src="../assets/index/okmanr.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
export default {
  created() {},
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      imgUrl: "/xinda-api/ajaxAuthcode",
      imgShow: true,
      phoneInput: "",
      imgVInput: "",
      phoneV: "",
      pVShow: true,
      rshow: true,
      pshow: true,
      pwInput: "",
      pwShow: false,
      seleCode: '',

      
    };
  },
  methods: {
    //三级联动
    // proChange(){
    //   this.citys = dist[this.province];
    // },
    // cityChange(){
    //   this.areas=dist[this.city];
    // },
    ...mapActions(["setTitle"]),
    created() {},
    selected: function(data){
        this.seleCode =  data.area.code; 
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
        this.pshow = true;
        if (!result) {
          this.pshow = false;
        }
      }
    },
    //重新获得焦点，提示框消失
    focus() {
      this.pshow = true;
      this.rshow = true;
    },
    //图片验证码输入错误
    imgVB() {
      let vReg = /^[0-9a-zA-Z]{4}$/;
      let imgVR = vReg.test(this.imgVInput);
      if (!imgVR && this.imgVInput !== "") {
        this.imgShow = false;
      }
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
            this.rshow = false;
          }
        });
    },
    imgVA() {
      if (this.imgVInput !== "") {
        this.imgShow = true;
        this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
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
            console.log(data);
          });
      }
    },

    //手机验证码输入验证
    pvBlur() {
      let pVReg = /^\d{6}$/;
      if (!pVReg.test(this.phoneV) && this.phoneV !== "") {
        this.pVShow = false;
      }
    },
    pVFocus() {
      this.pVShow = true;
    },
    //验证码刷新-
    reImg() {
      this.imgUrl = this.imgUrl + "?r=" + new Date().getTime();
    },
    //密码输入验证
    pwBlur() {
      let pwResult = pwReg.test(this.pwInput);
      if (this.pwInput !== "") {
        if (!pwResult) {
          this.pwShow = true;
        }
      }
    },
    pwFocus() {
      this.pwShow = false;
    },
    //立即注册
    submit() {
      var user = this.phoneInput;
      var pw = this.pwInput;
      var md5 = require("md5");

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
          console.log("注册提交", data.data.msg, data.data.status);
        });
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
    padding: 1px 0;
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
      a {
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
    padding: 0.5rem 0.15rem;
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
