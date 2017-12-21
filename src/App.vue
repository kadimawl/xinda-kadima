<template>
  <div id="app">
    <keep-alive>
      <router-view @userSignIn="userSignIn"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import distpicker from '@/components/distpicker'
export default {
  // components: {distpicker},
  created() {
    if (this.$route.path == "/") {
      if (this.browserRedirect()) {
        this.$router.push("/");
      } else {
        this.$router.push("/m");
        
      }
    }
  },
  //判断移动端还是pc端
  methods: {
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        return false;
        document.writeln("p");
      } else {
        return true;
        document.writeln("pc");
      }
    }
  },
  data() {
    return {
      userName: sessionStorage.userName
    };
  },
  name: "app",
  methods: {
    //子组件(login)将用户名传过来
    userSignIn(userName) {
      sessionStorage.userName = userName;
      this.userName = sessionStorage.userName;
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
button {
  outline: 0;
  border: none;
}
input {
  outline: 0;
  padding: 5px;
  box-sizing: border-box;
}
select {
  outline: 0;
}
option {
  outline: 0;
}
</style>
