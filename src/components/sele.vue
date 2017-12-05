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
                <a href="javascript:void(0)">产品</a>
                <span></span>
                <a href="javascript:void(0)" class="act">服务商</a>
            </div>
            <div>
                <input type="text" placeholder="搜索您需要的服务或服务商"><button></button>
            </div>
            <div class="inpB">
                <p>热门服务：</p>
                <a href="javascript:void(0)"><p>社保开户</p></a>
                <a href="javascript:void(0)"><p>公司注册</p></a>
            </div>
        </div>
        <div class="tel">
            <div class="telI"></div>
            <div class="telP">010-83421842</div>
        </div>
    </div>
    <div class="navigation">
      <a href="javascript:void(0)" class="">全部商品</a>
      <a href="javascript:void(0)" class="">财税服务</a>
      <a href="javascript:void(0)" class="">公司工商</a>
      <a href="javascript:void(0)" class="">加盟我们</a>
      <a href="javascript:void(0)" class="">店铺</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seleShow: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.Select{
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
      color: #2693d4;
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
      color: #2a2a2a;
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
  margin: 0 auto;
  a {
    text-decoration: none;
    font-size: 18px;
    color: #2b2b2b;
    font-weight: normal;
    text-align: center;
    line-height: 50px;
    display: inline-block;
    width: 200px;
    height: 50px;
  }
}
</style>
