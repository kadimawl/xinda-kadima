<template>
    <div class="box">
        <div class="aTop">
            <span></span><p>账户设置</p>  
        </div>
        <div class="topTitle">账户设置<span></span></div>
        <div class="account">
            <div class="hIMG">
                <P>当前头像：</P>
                <div></div>
            </div>
            <div class="name">
                <p>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名：</p><input type="text"></div>
            <div class="gender">
                <p>性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：</p><input type="radio">
                <p>男</p><input type="radio">
                <p>女</p>
            </div>
            <div class="email">
                <p>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱：</p><input type="text">
            </div>
            <div class="address">
                <p>所在地区：</p>
            </div>
            <button>保存</button>
        </div>
        <div class="topTitle">修改密码
            <span></span>
        </div>
        <div class="modification">
            <div class="old">
                <p>旧密码：</p><input type="text">
            </div>
            <div class="new">
                <p>新密码：</p><input type="text">
            </div>
            <div class="again">
                <p>再次输入新密码：</p><input type="text">
            </div>
            <button>保存</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  max-width: 768px;
  height: 1333px;
  margin: 0 auto;
}
.aTop {
  width: 100%;
  height: 77px;
  text-align: center;
  background: #e5e5e5;
  font-size: 28px;
  color: #000;
  line-height: 77px;
  display: flex;
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #fff;
    background: url(../../assets/mobile/mobileS.png) -12px -8px;
    margin: auto 0 auto 20px;
  }
  p{
      margin: 0 0 0 37%;
  }
}
.topTitle {
  width: 92.6%;
  height: 79px;
  margin: 0 3.7%;
  font-size: 28px;
  color: #000;
  padding-top: 40px;
  box-sizing: border-box;
  span {
    display: flex;
    width: 0;
    height: 0;
    //   border-bottom: 4px solid #2693d4;
    //   border-left: 4px transparent;
    //   border-right: 4px transparent;
    //   border-top: 4px transparent;
    overflow: hidden;
    border-width: 4px;
    border-color:  transparent transparent #2693d4 transparent;
    border-style: solid dashed dashed dashed;
    margin-top: -5px;
    margin-left: 7.1%;
  }
}
.account {
  max-width: 768px;
  border-bottom: 6px solid #dfdfdf;
  border-top: 2px solid #2693d4;
  padding: 18px 14.7% 0 5.7%;
  font-size: 26px;
  .hIMG {
    display: flex;
    height: 96px;
    line-height: 96px;
    margin-bottom: 14px;
    div {
      width: 12.8%;
      height: 96px;
      margin-left: 6.3%;
      border-radius: 50%;
      background: red;
    }
  }
  .name {
    display: flex;
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
    input {
      margin-left: 2.6%;
      width: 55.6%;
    }
  }
  .gender {
    display: flex;
    margin-bottom: 25px;
    input {
      height: 32px;
      width: 32px;
      background-color: #fff;
      margin-left: 4.25%;
      margin-right: 2.17%;
    }
    input:last-child {
      margin-left: 9.8%;
    }
  }
  .email {
    display: flex;
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
    input {
      margin-left: 2.6%;
      width: 55.6%;
    }
  }
  .address {
    height: 44px;
    display: flex;
    line-height: 44px;
    margin-bottom: 34px;
  }
  button {
    width: 130px;
    height: 47px;
    background: #fff;
    outline: 0;
    border-radius: 2px;
    border: 1px solid #2693d4;
    color: #2693d4;
    font-size: 28px;
    font-weight: 400;
    line-height: 47px;
    margin: 0 0 26px 20.4%;
  }
}
.modification {
  max-width: 768px;
  border-bottom: 6px solid #dfdfdf;
  border-top: 2px solid #2693d4;
  padding: 128px 14.7% 0 5.7%;
  font-size: 26px;
  p {
    width: 43.3%;
  }
  input {
    width: 42.6%;
  }
  div {
    margin-bottom: 19px;
  }
  .old {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
  }
  .new {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
  }
  .again {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
  }
  button {
    width: 130px;
    height: 47px;
    background: #fff;
    outline: 0;
    border-radius: 2px;
    border: 1px solid #2693d4;
    color: #2693d4;
    font-size: 28px;
    font-weight: 400;
    line-height: 47px;
    margin: 45px 0 26px 38.8%;
  }
}
</style>
