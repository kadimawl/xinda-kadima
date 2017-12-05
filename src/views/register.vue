<template>
<div class="lOut">
    <div class="leftOut">
      <input type="text" placeholder="  请输入手机号码"  v-model="phoneInput" @blur="phone" @focus="focus"><p class="errorMsg" v-show="!pshow">请输入正确手机号</p>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><img @click="reImg" :src="imgUrl" alt=""></div><p class="errorMsg" v-show="!imgShow">图片验证码为四位（数字或者字母）</p>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><button  class="clickGet" @click="clickGet"><span v-show="show">点击获取</span><span class="countdown" v-show="!show">重新发送{{count}}</span></button></div>
      <v-distpicker id="select" province="省" city="市" ></v-distpicker>
      <input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput">
      <button class="i-register" @click="submit">立即注册</button>
      <p class="agree">注册即同意遵守<a href="jacascript:void(0)">《服务协议》</a></p>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">已有账号？</p>
      <p class="immediately"><a href="/#/outter/login">立即登录>></a></p>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  created(){
    // this.ajax.post('/xinda-api/register/sendsms', canshu, {}).then((res) => {console.log('验证码验证', res)})
  },
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      imgUrl: "http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode",
      imgShow: true,
      phoneInput: "",
      pshow: true,
      pwInput: ""
    };
  },
  methods: {
    
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
    },
    //点击获取倒计时
    clickGet: function() {
      const TIME_COUNT = 60;
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
    },
    //验证码刷新-
    reImg() {
      this.imgUrl =
        "http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode?r=" +
        Math.random()
          .toString()
          .substr(2, 4);
    },
    //立即注册
    submit() {
      let storage = window.sessionStorage;
      var user = this.phoneInput;
      var pw = this.pwInput;
      console.log(pw,user);
      
      if (storage) {
        storage.setItem(user, pw);
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
    padding: 1px 0;
    outline: 0;
    margin-bottom: 19px;
  }
  .v-box {
    width: 281px;
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
    font-size: 16px;
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
  line-height: 14px;
  font-size: 14px;
  text-align: center;
  color: #262626;
  a {
    text-decoration: none;
    color: #409cd7;
  }
}
#select {
  font-size: 12px;
}
select {
  width: 78px;
  height: 33px;
  border: none;
  outline: 0;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
  margin-right: 15px;
  option {
    font-size: 12px;
  }
}

.errorMsg {
  width: 281px;
  height: 33px;
  border: 1px solid #f33;
  color: #f33;
  line-height: 33px;
  text-align: center;
  margin: 0 0 5px;
}
.countdown {
  color: #000;
}
</style>
