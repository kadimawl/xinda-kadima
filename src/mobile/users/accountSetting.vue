<template>
  <div class="box">
    <div class="aTop">
      <span></span>
      <p>账户设置</p>
    </div>
    <div class="topTitle">账户设置
      <span></span>
    </div>
    <div class="account">
      <div class="hIMG">
        <P>当前头像：</P>
        <div></div>
      </div>
      <div class="name">
        <p>姓名：</p><input type="text"></div>
      <div class="gender">
        <p>性别：</p><input type="radio">
        <p>男</p><input type="radio">
        <p>女</p>
      </div>
      <div class="email">
        <p>邮箱：</p><input type="text">
      </div>
      <div class="address">
        <p>所在地区：</p>
        <div class="selected">
          <distpicker @selected="selected"></distpicker>
        </div>
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
import distpicker from "@/components/distpicker";
export default {
  components: { distpicker },
  data() {
    return {
      seleCode: ""
    };
  },
  methods: {
    selected: function(code) {
      this.seleCode = code;
      console.log(this.seleCode);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  margin: 0 auto;
}
.aTop {
  width: 100%;
  height: 0.77rem;
  text-align: center;
  background: #e5e5e5;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.77rem;
  display: flex;
  // span {
  //   display: inline-block;
  //   width: 30px;
  //   height: 30px;
  //   background-color: #fff;
  //   background: url(../../assets/mobile/mobileS.png) -12px -8px;
  //   margin: auto 0 auto 20px;
  // }
  p {
    margin: 0 0 0 37%;
  }
}
.topTitle {
  width: 100%;
  height: 0.79rem;
  margin: 0 3.7%;
  font-size: 0.28rem;
  color: #000;
  padding-top: 0.4rem;
  box-sizing: border-box;
  span {
    display: flex;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 0.08rem;
    border-color: transparent transparent #2693d4 transparent;
    border-style: solid dashed dashed dashed;
    margin-top: -0.11rem;
    margin-left: 6.9%;
  }
}
.account {
  border-bottom: 0.06rem solid #dfdfdf;
  border-top: 0.02rem solid #2693d4;
  padding: 0.18rem 0.48rem 0 0.4rem;
  font-size: 0.26rem;
  p {
    width: 20.8%;
  }
  .hIMG {
    display: flex;
    height: 0.96rem;
    line-height: 0.96rem;
    margin-bottom: 0.14rem;
    div {
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 50%;
      background: red;
      margin-left: .25rem
    }
  }
  .name {
    display: flex;
    height: 0.43rem;
    line-height: 0.43rem;
    margin-bottom: 0.25rem;
    input {
      width: 3.27rem;
    }
  }
  .gender {
    display: flex;
    margin-bottom: 0.25rem;
    input {
      height: 0.32rem;
      width: 0.32rem;
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
    height: 0.43rem;
    line-height: 0.43rem;
    margin-bottom: 0.2rem;
    input {
      width: 3.27rem;
    }
  }
  .address {
    height: 0.44rem;
    display: flex;
    line-height: 0.44rem;
    margin-bottom: 0.34rem;
  }
  button {
    width: 1.3rem;
    height: 0.47rem;
    background: #fff;
    outline: 0;
    border-radius: 0.02rem;
    border: 0.01rem solid #2693d4;
    color: #2693d4;
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.47rem;
    margin: 0 0 0.26rem 20.4%;
  }
}

.selected {
  width: 4.41rem;
  height: 0.43rem;
  div {
    display: flex;
    justify-content: space-between;
    .province,
    .city,
    .area {
      width: 1.32rem !important;
      height: 0.42rem !important;
      outline: 0;
      color: #b4b4b4;
      font-size: 0.2rem !important;
      option {
        font-size: 0.18rem !important;
      }
    }
  }
}
.modification {
  border-bottom: 0.06rem solid #dfdfdf;
  border-top: 0.02rem solid #2693d4;
  padding: 1.28rem 14.7% 0 5.7%;
  font-size: 0.26rem;
  p {
    width: 35%;
  }
  input {
    width: 42.6%;
  }
  div {
    margin-bottom: 0.19rem;
  }
  .old {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    display: flex;
  }
  .new {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    display: flex;
  }
  .again {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    display: flex;
  }
  button {
    width: 1.3rem;
    height: 0.47rem;
    background: #fff;
    outline: 0;
    border-radius: 0.02rem;
    border: 0.01rem solid #2693d4;
    color: #2693d4;
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.47rem;
    margin: 0 0 0.26rem 20.4%;
  }
}
</style>
