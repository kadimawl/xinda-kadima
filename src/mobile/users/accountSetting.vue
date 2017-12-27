<template>
  <div class="box">
    <!-- <mt-header title="账户设置">
      <router-link to="/m/users/logined" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <div class="topTitle">账户设置
      <span></span>
    </div>
    <div class="account">
      <div class="hIMG">
        <P>当前头像：</P>
        <div><img src="../../assets/mobile/h.jpg" alt=""></div>
      </div>
      <div class="name">
        <p>姓名：</p><input type="text" v-model="name"></div>
      <div class="gender">
        <p>性别：</p><el-radio v-model="radio" :label="1" id="man">男</el-radio>
            <el-radio v-model="radio" :label="2" id="woman">女</el-radio>
      </div>
      <div class="email">
        <p>邮箱：</p><input type="text" v-model="email">
      </div>
      <div class="address">
        <p>所在地区：</p>
        <div class="selected">
          <distpicker class="mySelect" :regionId="regionId" @selected="selected"></distpicker>
        </div>
      </div>
      <button @click="preservation">保存</button>
    </div>
    <div class="topTitle">修改密码
      <span></span>
    </div>
    <div class="modification">
      <div class="old">
        <p>旧密码：</p><input type="text" v-model="oldPw" @blur="oldI">
      </div>
      <div class="new">
        <p>新密码：</p><input type="text" v-model="newPw" @blur="newI">
      </div>
      <div class="again">
        <p>再次输入新密码：</p><input type="text" v-model="againPw" @blur="againI">
      </div>
      <button @click="changePw">保存</button>
    </div>
  </div>
</template>

<script>
import {  mapActions } from "vuex";
import distpicker from "@/components/distpicker";
let pwReg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/;
import { MessageBox } from "mint-ui";
var md5 = require("md5");
export default {
  components: { distpicker },
  data() {
    return {
      name: "",
      email: "",
      seleCode: "",
      oldPw: "",
      pw: "",
      newPw: "",
      againPw: "",
      regionId: '',
      radio:'',//性别
    };
  },
  created() {
    var that = this;
    //默认渲染
    this.ajax.post("/xinda-api/member/info").then(data => {
      var infos=data.data.data;
      that.email = infos.email;
      that.regionId=infos.regionId;
      that.radio=infos.gender;
      that.name = infos.name;
      that.pw = infos.password;
      console.log(infos.regionId);
      console.log('data==',data)
    });
  },
  methods: {
    selected: function(code) {
      this.seleCode = code;
    },
    //修改信息
    preservation() {
      this.ajax
        .post(
          "/xinda-api/member/update-info",
          this.qs.stringify({
            name: this.name,
            gender: 1,
            email: this.email,
            regionId: this.seleCode
          })
        )
        .then(data => {
          console.log(data.data);
          if (data.data.status == 1) {
            MessageBox.alert("修改成功", "提示");
          }
        });
    },
    oldI() {
      var that = this;
      if (this.oldPw != "" && !pwReg.test(this.oldPw)) {
        MessageBox.alert("密码为：（6-20数字，大小写字母）").then(action => {
          that.oldPw = "";
        });
      }
    },
    newI() {
      var that = this;
      if (this.newPw != "" && !pwReg.test(this.newPw)) {
        MessageBox.alert("密码为：（6-20数字，大小写字母）").then(action => {
          that.newPw = "";
        });
      }
    },
    againI() {
      var that = this;
      if (this.againPw != "" && !pwReg.test(this.againPw)) {
        MessageBox.alert("密码为：（6-20数字，大小写字母）").then(action => {
          that.againPw = "";
        });
      }
    },
    //修改密码
    changePw() {
      this.ajax
        .post(
          "/xinda-api/sso/change-pwd",
          this.qs.stringify({
            oldPwd: md5(this.oldPw),
            newPwd: md5(this.againPw)
          })
        )
        .then(data => {
          if (data.data.status == 1) {
            MessageBox.alert("修改成功", "提示");
          } else if (data.data.status == -1) {
            MessageBox.alert("旧密码错误", "提示");
          }
        });
    }
  }
};
</script>

<style lang="less" >
.box {
  margin: 0 auto;
}

.topTitle {
  width: 100%;
  height: 0.79rem;
  margin: 0 3.7%;
  font-size: 0.28rem;
  color: #000;
  padding-top: 0.4rem;
  box-sizing: border-box;
  text-align: left;
  span {
    display: flex;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 0.08rem;
    border-color: transparent transparent #2693d4 transparent;
    border-style: solid dashed dashed dashed;
    margin-top: -0.12rem;
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
      margin-left: 0.25rem;
    }
    img{
      border-radius: 50%;
      width: 0.96rem;
      height: 0.96rem;
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
}
.mySelect {
  display: flex;
  justify-content: space-between;
  select {
    width: 1.32rem !important;
    height: 0.42rem !important;
    outline: 0;
    color: #000;
    font-size: 0.2rem !important;
    option {
      font-size: 0.18rem !important;
      color: #000;
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

.mint-header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #2693d4;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 0.28rem;
  height: .77rem;
  line-height: .77rem;
  // padding: 0 0.01rem;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
</style>
