<template>
  <div class="toJoinUs">
    <img src="../../assets/index/join/jiameng.jpg" alt="" class="firstIMg">
    <div class="valuable"><span>加盟我们</span><br><span>只做有价值的平台</span></div>
    
    <h4>TO JOIN IN</h4>
    <p class="f00">服务商加盟</p>
    <div class="a6"><div class="fff"></div></div>
    <p class="url">www.xinda.com</p>
    <p class="introduce">信达提供线上精准营销方案、帮助服务商快捷、低成本的获得有效客户，为传统优质服务商插上互联网的翅膀，助力企业腾飞。</p>
    <div class="lv"><img src="../../assets/index/join/lv.jpg" alt=""></div>
    
    <div class="edf0f3">
      <h4>YOU WILL RECEIVE</h4>
      <p class="f00">你将获得</p>
      <div class="a6 a6second"><div class="fff"></div></div>
      <p class="url">www.xinda.com</p>
      <div class="edInner">
        <div class="edLeft">
          <div class="edList edListO">
            <div class="bgBox bgZero"></div>
            <p>精准的线上曝光机会</p>
          </div>
          <div class="edList">
            <div class="bgBox bgOne"></div>
            <p>系统化的营销解决方案</p>
          </div>
        </div>
        <div class="edRight">
          <div class="edList edListO">
            <div class="bgBox bgTwo"></div>
            <p>万亿市场份额</p>
          </div>
          <div class="edList">
            <div class="bgBox bgThree"></div>
            <p>各种补贴优惠</p>
          </div>
        </div>
      </div>
    </div>
    
    <h4>PROFESSIONAL</h4>
    <p class="f00 whoC">哪些职业可以加盟</p>
    <div class="a6 a6third"><div class="fff"></div></div>
    <p class="url">www.xinda.com</p>
    <div class="providers">
      <div class="pList">
        <div class="icon iconOne"></div>
        <div  @mouseenter="colorC" @mouseleave="color" :class='[styles]'>
          <p class="h3">工商注册</p>
          <p >REGISTERED </p>
        </div>
        
      </div>
      <div class="pList">
        <div class="icon iconTwo"></div>
        <div @mouseenter="colorCh" @mouseleave="colorRE" :class='[stylesO]'>
        <p class="h3" >财税服务 </p>
        <p>SERIVER</p>
        </div>
        
      </div>
      <div class="pList">
        <div class="icon iconThree"></div>
        <div @mouseenter="colorCha" @mouseleave="colorREV" :class='[stylesOS]'>
          <p class="h3">知识产权</p>
        <p>INTELLECTUAL PRORERTY</p>
        </div>
        
      </div>
      <div class="pList">
        <div class="icon iconFour"></div>
        <div @mouseenter="colorChan" @mouseleave="colorREVE" :class='[stylesOSS]'>
          <p class="h3">人力外包</p>
        <p>HR OUTSOURCING</p>
        </div>
        
      </div>
    </div>

    <p class="we">我们需要什么样的服务商？</p>
    <div class="weMsg">
      <div class="jregistered" v-show="jregistered">
        在公司注册、公司变更、资质审批等领域深耕多年，在业内享有一定的知名度，可以提供优质优价的服务；<br>
        立足未来，了解创业者的需求，并乐于为创业者服务。
      </div>
      <div class="jServer" v-show='jServer'>
        在代理记账、审计验资等领域深耕多年，可以提供涉足各个行业优秀的财会人员；<br>
        与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。
      </div>
      <div class="jProperty" v-show='jProperty'>
        在商标注册，版权专利，著作权等领域深耕多年，具有丰富的知识产权经验； <br>
        与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。 
      </div>
      <div class="jHr" v-show='jHr'>
        在人事代理、企业社保、个人社保等领域深耕多年，具有丰富的社保代理经验。 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styles: "",
      stylesO: "",
      stylesOS: "",
      stylesOSS: "",
      jregistered: true,
      jServer: false,
      jProperty: false,
      jHr: false,
    };
  },
  methods: {
    //mouseenter事件
    colorC() {
      this.styles = "colorChange";
      this.jregistered = true;
      this.jServer = false;
      this.jProperty = false;
      this.jHr = false;
    },
    colorCh() {
      this.stylesO = "colorChange";
      this.jregistered = false;
      this.jServer = true;
      this.jProperty =false;
      this.jHr = false;
    },
    colorCha() {
      this.stylesOS = "colorChange";
      this.jregistered = false;
      this.jServer = false;
      this.jProperty = true;
      this.jHr = false;
    },
    colorChan() {
      this.stylesOSS = "colorChange";
      this.jregistered= false;
      this.jServer= false;
      this.jProperty= false;
      this.jHr= true;
    },

    //mouseleave事件
    color() {
      this.styles = "";
    },
    colorRE() {
      this.stylesO = "";
    },
    colorREV() {
      this.stylesOS = "";
    },
    colorREVE() {
      this.stylesOSS = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.firstIMg {
  width: 100%;
  position: relative;
  margin-bottom: 6px;
}
.valuable {
  font-size: 24px;
  color: #49484b;
  text-align: center;
  position: absolute;
  top: 315px;
  left: 700px;
}
h4 {
  width: 300px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  margin: 34px auto 16px;
  font-family: "STKaiti";
}
.f00 {
  width: 306px;
  height: 36px;
  line-height: 26px;
  padding-bottom: 10px;
  box-sizing: border-box;
  margin: 40px auto 0;
  text-align: center;
  font-size: 26px;
  color: #f00;
  border-bottom: 1px solid #a6a6a6;
  position: relative;
  z-index: 1000;
}
.a6 {
  width: 234px;
  height: 45px;
  border: 1px solid #a6a6a6;
  position: absolute;
  top: 600px;
  left: 672px;
  .fff {
    width: 164px;
    height: 45px;
    border-bottom: 1px solid #fff;
    margin: 0 auto;
  }
}
.a6second {
  .fff {
    border-bottom: 1px solid #edf0f3;
  }
  position: absolute;
  top: 1185px;
}
.a6third {
  width: 321px;
  height: 45px;
  border: 1px solid #a6a6a6;
  position: absolute;
  top: 1750px;
  left: 632px;
  .fff {
    width: 250px;
    height: 45px;
    border-bottom: 1px solid #fff;
    margin: 0 auto;
  }
}

.edf0f3 {
  height: 565px;
  background-color: #edf0f3;
  padding-top: 1px;
  box-sizing: border-box;
  .f00 {
    margin-top: 83px;
  }
}
.edInner {
  width: 1200px;
  height: 352px;
  margin: 20px auto 0;
  display: flex;
  .edListO {
    margin-bottom: 22px;
  }
  .edList {
    margin-left: 167px;
    width: 434px;
    height: 166px;
    display: flex;
    .bgBox {
      width: 85px;
      height: 80px;
      background: url(../../assets/index/Sprites.png) -166px -477px;
      margin-bottom: 86px;
    }
    .bgOne {
      background-position-y: -383px;
    }
    .bgTwo {
      background-position: -153px -285px;
    }
    .bgThree {
      background-position: -358px -326px;
    }
    p {
      font-size: 16px;
      line-height: 16px;
      color: #232324;
      margin-left: 21px;
      margin-top: 36px;
    }
  }
}
.url {
  width: 100px;
  margin: 6px auto 0;
  font-size: 8px;
  color: #585858;
}
.introduce {
  width: 1110px;
  font-weight: 600;
  text-align: center;
  margin: 50px auto 0;
}
.lv {
  img {
    display: block;
    width: 532px;
    height: 322px;
    margin: 0 auto;
  }
}

.whoC {
  margin-top: 83px;
}
.providers {
  width: 1200px;
  height: 260px;
  margin: 47px auto 0;
  display: flex;
  .pList {
    width: 400px;
    padding: 0 70px;
    box-sizing: border-box;
    .icon {
      width: 160px;
      height: 180px;
      background: url(../../assets/index/sum.png) -265px 0;
    }
    .iconTwo {
      background-position-y: -210px;
    }
    .iconThree {
      background-position: -264px -427px;
    }
    .iconFour {
      background-position-y: -650px;
    }
    p {
      text-align: center;
      font-size: 11px;
      // color: #a3a3a3;
      margin: 0;
    }
    .h3 {
      font-size: 18px;
      font-weight: 600;
      // color: #000;
      margin: 18px 0 5px;
      text-align: center;
    }
  }
}

.we {
  width: 260px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 600;
  margin: 66px auto 27px;
}

.weMsg {
  width: 1100px;
  height: 50px;
  margin: 0 auto 90px;
  text-align: center;
  font-size: 17px;
  color: #676767;
}

//mouseenter改变样式
.colorChange {
  color: #169bd5;
}
</style>