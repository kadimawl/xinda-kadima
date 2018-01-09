<template>
    <div class="acBody" @click="acBodyclick">
        <!-- 头像 -->
        <div class="nowtx">
            <p>当前头像：</p>
            <img src="../assets/mobile/h.jpg" alt="">
        </div>
        <!-- 姓名 -->
        <div class="name">
            <p>姓名：</p>
            <input v-model="inputN" class="inputname" placeholder="请输入姓名" @blur="inputname">
            <span class="mark" :style="{color:colorN}">*</span>
        </div>
        <!-- 性别 -->
        <div class="sex">
            <p>性别：</p>
            <el-radio v-model="radio" :label="1" checked>男</el-radio>
            <el-radio v-model="radio" :label="2">女</el-radio>
            <span class="mark" :style="{color:colorS}">*</span>
        </div>
        <!-- 邮箱 -->
        <div class="mailbox">
            <p>邮箱：</p>
            <input v-model="inputM" class="inputname" placeholder="请输入邮箱" @blur="mail">
            <span class="mark" :style="{color:colorM}">*</span>
        </div>
        <!-- 地区 -->
        <div class="inarea">
            <p>所在地区:</p>
            <!-- 三级联动 -->
            <div class="address">
                <select @change="proChange" v-model="province" @blur="choosearea">
                    <option value="0">省</option>
                    <option :value="code" v-for="(province,code) in provinces" :key="province.code">{{province}}</option>
                </select>
                <select @change="cityChange" v-model="city" @blur="choosearea">
                    <option value="0">市</option>
                    <option :value="code" v-for="(city,code) in citys" :key="city.code">{{city}}</option>
                </select>
                <select @change="areaChange" v-model="area" @blur="choosearea">
                    <option value="0">区</option>
                    <option :value="code" v-for="(area,code) in areas" :key="area.code">{{area}}</option>
                </select>
            </div>
            <span class="mark" :style="{color:colorA}">*</span>
        </div>
        <!-- 保存按钮 -->
        <div class="storage">
            <button @click="store">保存</button>
        </div>
    </div>

</template>

<script>
// 引入
import { mapGetters } from "vuex";
import dist from "../districts/districts";
import { Radio ,Message} from "element-ui";
export default {
  created() {
    if (this.getName) {
      var that = this;
      that.ajax.post("/xinda-api/member/info").then(function(data) {
        if (data.data.status == 1) {
          sessionStorage.setItem(
            "account" + that.getName + "",
            JSON.stringify(data)
          );
          that.pageshow(data);
        } else {
          that.errorshow = true;
          that.error = data.data.msg;
          that.acolor = "#ff4745";
        }
      });
    } else {
      // 未登录不拉取数据
      this.errorshow = true;
      this.error = "亲，先要登录哦";
      this.acolor = "#ff4745";
    }
  },
  computed: {
    ...mapGetters(["getName"])
  },
  data() {
    return {
      inputN: "", //输入姓名
      inputM: "", //输入邮箱
      radio: "1", //性别单选框
      errorshow: false, //控制错误框
      error: "", //错误提示
      acolor: "#ff4649", //错误提示的颜色
      colorN: "#ff4649", //
      colorS: "#ff4649", //
      colorM: "#ff4649", //
      colorA: "#ff4649", //
      seleCode: "", //地区编号
      provinces: dist[100000], //省
      citys: [], //市
      areas: [], //区
      province: "0", //省
      city: "0", //市
      area: "0" //区
    };
  },
  components: {
    [Radio.name]: Radio
  },
  methods: {
    // 处理ajax拉取数据
    pageshow: function(data) {
      if (data) {
        var datas = data.data.data;
        this.inputN = datas.name;
        this.inputM = datas.email;
        if (datas.gender == "1" || datas.gender == "2") {
          this.radio = datas.gender;
          this.choosesex();
        }
        // 处理三级联动
        this.seleCode = datas.regionId;
        this.showarea(this.seleCode);
      }
    },
    // 页面点击事件
    acBodyclick() {
      if (this.errorshow == true) {
        var that = this;
        setTimeout(function() {
          that.errorshow = false;
        }, 4000);
      }
    },
    // 邮箱失去焦点
    mail: function() {
      if (this.inputM) {
        if (
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            this.inputM
          )
        ) {
          this.errorshow = true; //提示
          this.error = "请输入正确的邮箱";
          this.acolor = "##ff4649";
        } else {
          this.errorshow = false;
          this.colorM = "#5d95e8";
        }
      }
    },
    // 名字失去焦点
    inputname: function() {
      if (this.inputN) {
        if (this.inputN.length <= 8 && this.inputN.length >= 2) {
          this.colorN = "#5d95e8";
        } else {
          this.errorshow = true; //提示
          this.error = "名字过短或过长";
          this.inputN = "";
        }
      }
    },
    // 性别框改变
    choosesex: function() {
      if (this.radio) {
        this.colorS = "#5d95e8";
      }
    },
    // 地区失去焦点
    choosearea: function() {
      if (this.province == "0" || this.city == "0" || this.area == "0") {
        if (this.colorA == "#5d95e8") {
          this.colorA = "#ff4649";
        }
      } else {
        this.colorA = "#5d95e8";
      }
    },
    // 保存
    store: function() {
      if (this.getName) {
        // 登录
        this.acolor = "#ff4745";
        if (!this.colorN == "#5d95e8") {
          //判断名字输入
          this.errorshow = true;
          this.error = "请输入名字";
          return;
        }
        if (!this.colorS == "#5d95e8") {
          //判断性别选择
          this.errorshow = true;
          this.error = "请选择性别";
          return;
        }
        if (!this.colorM == "#5d95e8") {
          //判断邮箱输入
          this.errorshow = true;
          this.error = "请输入正确的邮箱";
          return;
        }
        if (!this.colorA == "#5d95e8") {
          //判断地区选择
          this.errorshow = true;
          this.error = "请选择地区";
          return;
        }
        var data = JSON.parse(
          sessionStorage.getItem("account" + this.getName + "")
        );
        var datas = data.data.data;
        // 如果数据未发生变化，不会提交
        if (
          this.inputN != datas.name ||
          this.radio != datas.gender ||
          this.inputM != datas.email ||
          this.area != datas.regionId
        ) {
          // 更新个人信息
          var that = this;
          that.ajax
            .post(
              "/xinda-api/member/update-info",
              that.qs.stringify({
                name: that.inputN,
                gender: that.radio,
                email: that.inputM,
                regionId: that.seleCode
              })
            )
            .then(function(data) {
              if (data.data.status == 1) {
                //更新成功
                that.errorshow = true;
                Message({
                  message: "个人信息更新成功",
                  type: "success"
                });
                that.acolor = "#5d95e8";
                // 重新拉取数据
                that.ajax.post("/xinda-api/member/info").then(function(data) {
                  if (data.data.status == 1) {
                    // 头像暂时无法设置
                    that.pageshow(data);
                  } else {
                    that.errorshow = true;
                    Message.error({
                      message: "更新获取最新信息失败",
                      type: "success"
                    });
                    that.acolor = "#ff4745";
                  }
                });
              } else {
                //更新失败
                Message.error({
                  message: "更新失败",
                  type: "success"
                });
              }
            });
        } else {
          Message({
            message: "请勿重复提交",
            type: "warning"
          });
        }
      }
    },
    // 三级联动
    proChange() {
      //  省
      this.city = "0";
      this.area = "0";
      if (this.province != "0") {
        this.citys = dist[this.province];
      }
    },
    cityChange() {
      // 市
      this.areas = dist[this.city];
      // console.log(this.city)
    },
    areaChange() {
      // 区
      this.seleCode = this.area;
      // console.log(this.seleCode)
    },
    // 三级联动显示
    showarea(code) {
      var codearr = code.split("");
      codearr.splice(4, 2, "0", "0");
      var codecity = codearr.join("");
      codearr.splice(2, 2, "0", "0");
      var codepro = codearr.join("");
      this.province = codepro;
      this.proChange();
      this.city = codecity;
      this.cityChange();
      this.area = code;
      this.areaChange();
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.acBody {
  width: 1000px;
  height: 450px;
  margin-left: 20px;
  // 头像
  .nowtx {
    width: 300px;
    height: 100px;
    display: flex;
    line-height: 100px;
    margin-left: 10px;
    margin-top: 30px;
    p {
      margin-right: 50px;
    }
    img {
      width: 60px;
      height: 60px;
      margin: auto;
      border-radius: 50%;
    }
  }
  // 名字
  .name {
    width: 400px;
    height: 40px;
    display: flex;
    margin-left: 10px;
    margin-top: 30px;
    line-height: 40px;
    p {
      width: 70px;
      line-height: 40px;
      margin-right: 45px;
    }
    .inputname {
      width: 180px;
    }
  }
  // 性别
  .sex {
    width: 400px;
    height: 30px;
    display: flex;
    line-height: 30px;
    margin-left: 10px;
    margin-top: 20px;
    .el-radio {
      font-size: 16px;
      line-height: 30px;
    }
    p {
      margin-right: 70px;
    }
  }
  // 邮箱
  .mailbox {
    width: 400px;
    height: 40px;
    display: flex;
    line-height: 40px;
    margin-left: 10px;
    margin-top: 20px;
    input {
      width: 180px;
      font-size: 0.8em;
    }
    p {
      margin-right: 70px;
    }
  }
  // 地区
  .inarea {
    width: 800px;
    height: 50px;
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
    line-height: 50px;
    > p {
      margin-right: 50px;
    }
    .address {
      height: 50px;
      width: 400px;
      line-height: 50px;
      > select {
        width: 120px;
        height: 35px;
        line-height: 35px;
        margin-right: 10px;
        font-size: 16px;
      }
    }
  }
  // 保存
  .storage {
    width: 400px;
    height: 50px;
    margin-left: 10px;
    margin-top: 25px;
    line-height: 50px;
    button {
      width: 70px;
      height: 27px;
      border: 1px solid #2793d4;
      color: #2793d4;
      margin-left: 116px;
      background: #fff;
      border-radius: 5px;
    }
  }
  // 标记
  .mark {
    display: block;
    margin-left: 10px;
  }
}
</style>
