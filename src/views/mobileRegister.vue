<template>
    <div class="lOut">
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
            <v-distpicker id="select" province="省" city="市" @selected="selected"></v-distpicker>
        </div>
        <div class="pwBox"><input type="text" placeholder="  请输入密码" class="pw" v-model="pwInput" @blur="pwBlur" @focus="pwFocus">
            <p class="errorMsg exception" v-show="pwShow">密码为：8-20位数字，大小写字母</p>
        </div>
        <button class="i-register" @click="submit">立即注册</button>

    </div>
</template>

<script>
export default {
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
      seleCode: ""
    };
  }
};
</script>

<style lang="less">
.lOut {
  max-width: 768px;
  width: 100%;
  height: 1334px;
  margin: 0 auto;
  padding: 13% 9%;
  box-sizing: border-box;
  border: 1px solid;
  input {
    width: 73%;
    height: 73px;
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
    color: #fff;
    background: #2693d4;
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
}
</style>

