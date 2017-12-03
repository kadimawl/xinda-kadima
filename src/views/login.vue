<template>
  <div class="lOut">
    <div class="leftOut">
      <input type="text" placeholder="  请输入手机号码"><br>
      <input type="text" placeholder="  请输入密码"><br>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><div class="v-img"></div></div>
      <div class="forget"><a href="#">忘记密码？</a></div>
      <button>立即登录</button>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">还没有账号？</p>
      <p class="immediately"><a href="/#/outter/register">立即注册>></a></p>
      <img src="../assets/index/okman.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.lOut {
  margin: 0px auto 54px;
  padding-top: 43px;
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
    margin-bottom: 24px;
  }
  .v-box {
    width: 281px;
    display: flex;
    justify-content: space-between;
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
    button {
      width: 281px;
      height: 37px;
      color: #2693d4;
      background: #fff;
      font-size: 16px;
      border: none;
      border: 1px solid #2693d4;
      border-radius: 3px;
      outline: none;
      margin-top: 24px;
    }
    .forget {
      width: 281px;
      height: 20px;
      a {
        display: block;
        margin-top: 7px;
        font-size: 13px;
        color: #2693d4;
        text-decoration: none;
        line-height: 13px;
        float: right;
      }
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
    p{
      margin-left: 30px;
    }
    img{

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
</style>
