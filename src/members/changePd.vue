<template>
    <div class="changePd" @click="changePdclick">
        <!-- 旧密码 -->
        <div class="oldpd">
            <p>旧密码</p>
            <input :type="oldpdtype" v-model="inputoldpd" class="inputoldpd" placeholder="请输入旧密码" @blur="oldpdB">
            <img class="visible" :src="oldpdurl" @click="oldpdshow">
            <span class="mark" :style="{color:colorOld}">*</span>
        </div>
        <!-- 新密码 -->
        <div class="newpd">
            <p>新密码</p>
            <input :type="newpdtype" v-model="inputnewpd" class="inputnewpd" placeholder="请输入新密码" @blur="newpdB">
            <img class="visible" :src="newpdurl" @click="newpdshow">
            <span class="mark" :style="{color:colorNew}">*</span>
        </div>
        <!-- 再次输入新密码 -->
        <div class="again">
            <p>再次输入新密码</p>
            <input :type="againtype" v-model="inputagain" class="inputagain" placeholder="请再次输入新密码" @blur="againB">
            <img class="visible" :src="againurl" @click="againshow">
            <span class="mark" :style="{color:colorAgain}">*</span>
        </div>
        <!-- 保存按钮 -->
        <div class="storage">
            <button @click="store">保存</button>
        </div>
        <!-- 错误提示框 -->
        <div class="errorbox" v-if="errorshow">
            <p :style="{color:acolor}">{{error}}</p>
        </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
// 引用md5和密码显示按钮图片
const eyes = [
  require("../assets/invisible.png"),
  require("../assets/visible.png")
];
export default {
  created() {
    this.errorshow = false;
  },
  data() {
    // oldpd与旧密码部分相关，newpd与新密码部分相关，again与再次输入密码相关
    return {
      inputoldpd: "", //
      inputnewpd: "", //
      inputagain: "", //
      colorOld: "#ff4649", //
      colorNew: "#ff4649", //
      colorAgain: "#ff4649", //
      acolor: "#ff4649", //错误提示的颜色
      errorshow: false, //控制错误框
      error: "", //错误提示
      oldpdurl: eyes[0], //密码眼睛提示
      newpdurl: eyes[0], //密码眼睛提示
      againurl: eyes[0], //密码眼睛提示
      oldpdtype: "password", //
      newpdtype: "password", //
      againtype: "password" //
    };
  },
  components: {},
  computed: {
    ...mapGetters(["getName"])
  },
  methods: {
    // 页面点击事件
    changePdclick() {
      if (this.errorshow == true) {
        var that = this;
        setTimeout(function() {
          that.errorshow = false;
          that.acolor = "#ff4649";
        }, 4000);
      }
    },
    // 旧密码失去焦点
    oldpdB: function() {
      if (this.inputoldpd) {
        if (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/.test(this.inputoldpd)) {
          this.colorOld = "#5d95e8";
          return;
        } else {
          this.errorshow = true;
          this.error = "请输入（8-20位）数字、大小写字母的旧密码";
          if (this.colorOld == "#5d95e8") {
            this.colorOld = "#ff4649";
          }
          return;
        }
      } else {
        this.colorOld = "#ff4649";
      }
    },
    // 新密码失去焦点
    newpdB: function() {
      if (this.inputnewpd) {
        //自己不为空
        if (this.inputoldpd) {
          //旧密码不为空
          if (
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/.test(this.inputnewpd) &&
            this.inputoldpd != this.inputnewpd
          ) {
            //符合正则且与旧密码不同
            this.colorNew = "#5d95e8";
            return;
          }
          if (
            !/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/.test(this.inputnewpd)
          ) {
            //不符合正则
            this.errorshow = true;
            this.error = "请输入（8-20位）数字、大小写字母的新密码";
            if (this.colorNew == "#5d95e8") {
              this.colorNew = "#ff4649";
            }
            return;
          }
          if (this.inputoldpd == this.inputnewpd) {
            //与旧密码不同
            this.errorshow = true;
            this.error = "请不要设置相同的密码";
            this.inputnewpd = "";
            if (this.colorNew == "#5d95e8") {
              this.colorNew = "#ff4649";
            }
            return;
          }
        } else {
          //旧密码为空
          this.errorshow = true;
          this.error = "请先输入旧密码";
        }
      } else {
        //自己空
        this.colorNew = "#ff4649";
      }
    },
    // 再次输入密码失去焦点
    againB: function() {
      if (this.inputagain) {
        //不为空
        if (this.inputnewpd) {
          //新密码不为空
          if (
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/.test(this.inputagain) &&
            this.inputagain == this.inputnewpd
          ) {
            //密码符合正则且两次新密码输入相同
            this.colorAgain = "#5d95e8";
            return;
          }
          if (
            !/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/.test(this.inputagain)
          ) {
            //密码不符合正则
            this.errorshow = true;
            this.error = "请输入（8-20位）数字、大小写字母的新密码";
            if (this.colorAgain == "#5d95e8") {
              this.colorAgain = "#ff4649";
            }
            return;
          }
          if (this.inputagain != this.inputnewpd) {
            //两次新密码输入不同
            this.errorshow = true;
            this.error = "两次新密码输入不同";
            if (this.colorAgain == "#5d95e8") {
              this.colorAgain = "#ff4649";
            }
            return;
          }
        } else {
          //新密码为空
          this.errorshow = true;
          this.error = "请先输入新密码";
        }
      } else {
        //自己为空
        this.colorAgain = "#ff4649";
      }
    },
    // 旧密码显示点击
    oldpdshow: function() {
      if (this.inputoldpd) {
        this.oldpdtype = this.oldpdtype === "password" ? "text" : "password";
        if (this.oldpdtype == "password") {
          this.oldpdurl = eyes[0];
        } else {
          this.oldpdurl = eyes[1];
        }
      }
    },
    // 新密码显示点击
    newpdshow: function() {
      if (this.inputnewpd) {
        this.newpdtype = this.newpdtype === "password" ? "text" : "password";
        if (this.newpdtype == "password") {
          this.newpdurl = eyes[0];
        } else {
          this.newpdurl = eyes[1];
        }
      }
    },
    // 再次输入新密码显示点击
    againshow: function() {
      if (this.inputagain) {
        this.againtype = this.againtype === "password" ? "text" : "password";
        if (this.againtype == "password") {
          this.againurl = eyes[0];
        } else {
          this.againurl = eyes[1];
        }
      }
    },
    // 修改密码
    store: function() {
      var md5 = require("md5");
      if (this.getName) {
        if (
          this.colorAgain == "#5d95e8" &&
          this.colorNew == "#5d95e8" &&
          this.colorOld == "#5d95e8"
        ) {
          var that = this;
          that.ajax
            .post(
              "/xinda-api/sso/change-pwd",
              that.qs.stringify({
                oldPwd: md5(that.inputoldpd),
                newPwd: md5(that.inputnewpd)
              })
            )
            .then(function(data) {
              if (data.data.status == 1) {
                //修改成功
                that.errorshow = true;
                that.error = data.data.msg;
                that.acolor = "#5d95e8";
                that.inputoldpd = "";
                that.inputnewpd = "";
                that.inputagain = "";
              } else {
                that.errorshow = true;
                that.error = "修改密码失败";
              }
            });
        } else {
          this.errorshow = true;
          this.error = "亲，输入有误，请重新输入";
        }
      } else {
        //未登录
        this.errorshow = true;
        this.error = "亲，先要登录哦";
      }
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.changePd {
  width: 800px;
  height: 300px;
  margin-left: 20px;
  // 一级盒子通用样式
  > div {
    display: flex;
    width: 500px;
    height: 50px;
    line-height: 50px;
  }
  // 所有p标签
  p {
    margin-left: 20px;
    color: #676767;
  }
  // 所有输入框
  input {
    width: 200px;
    height: 40px;
    border: 1px solid #b0b0b0;
  }
  // 旧密码
  .oldpd {
    margin-top: 40px;
    p {
      margin-right: 120px;
    }
  }
  // 新密码
  .newpd {
    margin-top: 20px;
    p {
      margin-right: 120px;
    }
  }
  // 再次输入新密码
  .again {
    margin-top: 20px;
    p {
      margin-right: 56px;
    }
  }
  // 保存
  .storage {
    margin-top: 40px;
    button {
      width: 87px;
      height: 33px;
      border: 1px solid #2793d4;
      color: #2793d4;
      margin-left: 190px;
      background: #fff;
      border-radius: 5px;
      font-size: 18px;
    }
  }
  // 错误提示
  .errorbox {
    width: 500px;
    height: 60px;
    position: absolute;
    left: 1100px;
    top: 390px;
    text-align: center;
    line-height: 60px;
    background: #f7f7f7;
    z-index: 10;
    p {
      font-size: 18px;
    }
  }
  // 标记
  .mark {
    display: block;
    margin-left: 10px;
    font-size: 20px;
  }
  // 密码显示按钮
  .visible {
    cursor: pointer;
    width: 17px;
    height: 12px;
    position: relative;
    top: 15px;
    right: 25px;
  }
}
</style>
