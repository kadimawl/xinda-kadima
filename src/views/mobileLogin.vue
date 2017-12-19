<template>
  <div>
    <div class="box">
      <div class="phoneBox"><input type="text" placeholder="  请输入手机号码" v-model="phoneInput" @blur="phone" @focus="pFocus">
        <p class="errorMsg" >该手机号未注册{{phoneMsg}}</p>
        <p class="errorMsg" >请输入正确的手机号</p>
      </div>
      <div class="pwBox"><input type="text" placeholder="  请输入密码" v-model="pwInput" @blur="pw" @focus="pwFocus">
        <p class="errorMsg" v-show="pwShow">请输入（8-20位）数字、大小写字母</p>
        <p class="errorMsg" v-show="pwEShow">手机号或者密码输入错误</p>
      </div>
      <div class="v-box">
        <div>
          <input type="text" placeholder="  请输入验证码" id="verification" v-model="imgVInput" @blur="imgVB" @focus="imgVA">
          <img @click="reImg" :src="imgUrl" alt="">
        </div>
        <p class="errorMsg" v-show="imgShow">图片验证码为4位（数字或者大小写字母）</p>
      </div>
      <button @click="iLogin">立即登录</button>
    </div>
    <div class="box-4d">
      <div class="left">还没有信达账号</div>
      <a href="/#/m/mobileRegister">立即注册</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneInput: "",
      phoneMsg: '',
      pwInput: "",
      imgVInput: "",
      imgUrl: "/xinda-api/ajaxAuthcode",
    };
  },
  methods: {
    phone() {

    }
  }
};
</script>

<style lang="less">
.box {
  max-width: 768px;
  max-height: 1280px;
  margin: 0 auto;
  padding: 0 13%;
  box-sizing: border-box;
}
input {
  height: 40px;
  margin-top: 30px;
}
.phoneBox {
  width: 100%;
  input {
    width: 80%;
  }
}
.pwBox {
  width: 100%;
  input {
    width: 80%;
  }
}
.v-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 46%;
  }
  img {
    width: 46%;
    margin-top: 30px;
  }
}
button {
  width: 80%;
  height: 45px;
  margin-top: 213px;
  font-size: 27px;
  font-weight: 400;
  color: #fff;
  outline: 0;
  background: #2693d4;
  text-align: center;
  line-height: 45px;
  border: none;
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
</style>

