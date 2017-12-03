<template>
<div class="lOut">
    <div class="leftOut">
      <input type="text" placeholder="  请输入手机号码"><br>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><img src="http://115.182.107.203:8088/xinda/xinda-api/ajaxAuthcode" alt=""></div>
      <div class="v-box"><input type="text" placeholder="  请输入验证码" id="verification"><button class="clickGet">点击获取</button></div>
      <div class="sel"><select name="" id="">
        <options>1</options>
        <options>2</options>
        <options>3</options>
        <options>4</options>
        <options>5</options>
        <options>6</options>
        <options>7</options>
        <options>8</options>
        <options>9</options>
        <options>10</options>
      </select>
      <select class="m-sele" name="" id="">
        <options>1</options>
        <options>2</options>
        <options>3</options>
        <options>4</options>
        <options>5</options>
        <options>6</options>
        <options>7</options>
        <options>8</options>
        <options>9</options>
        <options>10</options>
      </select>
      <select name="" id="">
        <options>1</options>
        <options>2</options>
        <options>3</options>
        <options>4</options>
        <options>5</options>
        <options>6</options>
        <options>7</options>
        <options>8</options>
        <options>9</options>
        <options>10</options>
      </select></div>
      <input type="text" placeholder="  请输入密码" class="pw"><br>
      <button class="i-register">立即注册</button>
      <p class="agree">注册即同意遵守<a href="jacascript:void(0)">《服务协议》</a></p>
    </div>
    <div class="midOut"></div>
    <div class="rightOut">
      <p class="notYet">已有账号？</p>
      <p class="immediately"><a href="/#/login">立即登录>></a></p>
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
    margin-bottom: 19px;
  }
  .v-box {
    width: 281px;
    display: flex;
    img{
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
.sele {
  display: flex;
  justify-content: space-between;
}
select {
  width: 78px;
  height: 33px;
  border: none;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
}
.m-sele{
  margin: 0 20px;
}
</style>
