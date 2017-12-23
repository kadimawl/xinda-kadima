<template>
  <div>
    <mt-header title="忘记密码">
      <router-link to="/m/users/mobile" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="lOut">
      <input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone">
      <!-- <p class="errorMsg" v-show="!pshow">请输入正确手机号</p> -->
      <!-- <p class="errorMsg" v-show="!rshow">该手机号已注册</p> -->
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB">
        <img @click="reImg" :src="imgUrl" alt="">
        <!-- <p class="errorMsg" v-show="!imgShow">图片验证码为四位（数字或者字母）</p> -->
      </div>
      <div class="v-box">
        <input type="text" placeholder="  请输入验证码" id="verification" v-model="phoneV" @blur="pvBlur">
        <button class="clickGet" @click="clickGet">
          <span v-show="show">点击获取</span>
          <span class="countdown" v-show="!show">重新发送{{count}}</span>
        </button>
        <!-- <p class="errorMsg" v-show="!pVShow">验证码为六位数字</p> -->
      </div>

      <input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput" @blur="pwBlur">
      <!-- <p class="errorMsg exception" v-show="pwShow">密码为：8-20位数字，大小写字母</p> -->

      <input type="text" placeholder="  请再次确认密码" @blur="pwShowAgain" v-model="validationInput">
      <!-- <p class="errorMsg" v-show="pwMSG">两次密码输入不一致</p> -->
      <button class="i-register" @click="submit">立即注册</button>

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
      pwInput: "",
      seleCode: "",
      validationInput: ""
    };
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
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
</style>

