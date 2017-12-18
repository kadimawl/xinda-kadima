<template>
  <div class="Select" v-show="seleShow">
    <div class="sele">
      <div class="logo">
        <div class="backG"></div>
        <h1>信达</h1>
        <div>
          <p>北京市</p>
          <a href="javascript:void(0)">[切换城市]</a>
        </div>
      </div>
      <div class="select">
        <div>
          <a href="javascript:void(0)" class="color2a" :class="[!isTrue?'color2a':'act']" @click="active">产品</a>
          <span></span>
          <a href="javascript:void(0)" class="color2a" :class="[isTrue?'color2a':'act']" @click="active">服务商</a>
        </div>
        <div>
          <input type="text" placeholder="搜索您需要的服务或服务商" v-model="seleVal" @keyup="seleBlur" @focus="seleFocus">
          <button></button>
        </div>
        <ul class="selebox" v-show="selebox">
          <li v-for="item in getSele" :key="item.id" @click="seleJump(item.id)">{{item.serviceName||item.productTypes}}</li>
        </ul>
        <div class="inpB">
          <p>热门服务：</p>
          <a href="javascript:void(0)">
            <p>社保开户</p>
          </a>
          <a href="javascript:void(0)">
            <p>公司注册</p>
          </a>
        </div>
      </div>
      <div class="tel">
        <div class="telI"></div>
        <div class="telP">010-83421842</div>
      </div>
    </div>
    <div class="navigation">
      <router-link class="defaults" active-class="colorChange" to="/HomePage/" @mouseover.native="over">全部商品</router-link>
      <router-link class="defaults" active-class="colorChange" to="/tabs/taxationList">财税服务</router-link>
      <router-link class="defaults" active-class="colorChange" to='/tabs/companyList'>公司工商</router-link>
      <router-link class="defaults" active-class="colorChange" to="/tabs/toJoinIn">加盟我们</router-link>
      <router-link class="defaults" active-class="colorChange" to="/shopIndex">店铺</router-link>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seleShow: true,
      isTrue: true,
      seleVal: "",
      selebox: true,
      seleList: [],
      getSele: [],
      seleId: []
    };
  },
  created() {
    this.getInput = this.debounce(this.seleBlur, 1000);
  },
  methods: {
    over: function() {
      this.$emit("display");
    },
    active() {
      this.isTrue = !this.isTrue;
    },
    seleBlur() {
      this.selebox = true;
      var seleUrl;
      if (this.seleVal != "") {
        if (this.isTrue) {
          seleUrl = "/xinda-api/product/package/search-grid";
        } else {
          seleUrl = "/xinda-api/provider/search-grid";
        }
        this.ajax
          .post(
            seleUrl,
            this.qs.stringify({
              searchName: this.seleVal
            })
          )
          .then(data => {
            this.seleList = [];
            this.getSele = [];
            this.seleList = data.data.data;
            if (this.seleList.length == 0) {
              this.seleList = [
                { serviceName: "抱歉，没有相关产品，请搜索其他产品，谢谢。" },
                { products: "抱歉，没有相关服务商，请搜索其他产品，谢谢" }
              ];
            }
            for (var key in this.seleList) {
                this.getSele.push(this.seleList[key]); 
                this.seleId.push(this.seleList[key].id);
            }
            console.log(this.getSele);
            console.log(this.seleId);
          });
      }
    },
    seleFocus() {
      this.seleVal = "";
      this.selebox = false;
    },
    //点击跳转商品详情页
    seleJump(id) {
      console.log(id);
      
      if(id){
        this.$router.push({path: '/detial',query:{id: id} });
      this.selebox = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.Select {
  border-bottom: 1px solid #2693d4;
}
.sele {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    vertical-align: bottom;
    p {
      font-size: 14px;
      line-height: 17px;
      font-weight: 400;
      text-align: center;
    }
    a {
      font-size: 14px;
      font-weight: 400;
      text-decoration: none;
      color: #2a2a2a;
    }
  }
}

.logo {
  display: flex;
  align-items: center;
}
.backG {
  display: block;
  height: 55px;
  width: 55px;
  background: url("../assets/index/memCen.png") no-repeat -21px -268px;
  margin: 10px;
}
h1 {
  margin-right: 20px;
}
.select {
  div {
    input {
      width: 481px;
      height: 37px;
      vertical-align: bottom;
      border: 2px solid #2693d4;
      margin-top: 5px;
      text-indent: 1em;
    }
    button {
      width: 101px;
      height: 41px;
      border: none;
      background: url("../assets/index/memCen.png") no-repeat -21px -401px;
      background-color: #2693d4;
      vertical-align: bottom;
      cursor: pointer;
    }
    span {
      display: inline-block;
      height: 15px;
      border-left: 1px solid #2693d4;
      margin: 2px;
      vertical-align: bottom;
    }
    .act {
      color: #2693d4;
    }
  }
  .inpB {
    p {
      display: inline;
      font-size: 11px;
      color: #c7c7c7;
    }
  }
}
.tel {
  display: flex;
}
.telI {
  display: block;
  width: 46px;
  height: 49px;
  background: url("../assets/index/memCen.png") no-repeat -27px -337px;
  margin: 10px 0 0;
}
.telP {
  color: #a3a3a3;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  margin: 25px 50px 0 0;
}

.navigation {
  width: 1200px;
  height: 48px;
  margin: 0 auto;
}
.defaults {
  text-decoration: none;
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  display: inline-block;
  color: #2b2b2b;
  width: 100px;
  height: 45px;
  margin: 0 50px;
  line-height: 45px;
}

.selebox {
  width: 485px;
  list-style: none;
  background: #169bd5;
  position: absolute;
  z-index: 1000;
  li {
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
}
.colorChange {
  color: #169bd5;
  border-bottom: 3px solid #169bd5;
  z-index: -1;
}
.colorFFF {
  color: #2b2b2b;
  border-bottom: none;
  z-index: -1;
}
</style>
