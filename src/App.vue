<template>
  <div id="app">
    <router-view @userSignIn="userSignIn"></router-view>
  </div>
</template>


<script>
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  // window.location.href = "#/";
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // if (clientWidth >= 750) {
        //   docEl.style.fontSize = "100px";
        // } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        // }
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })(document, window);
}
export default {
  name: "app",
  created() {
    //判断移动端还是pc端
    if (this.$route.path == "/HomePage") {
      if (this.browserRedirect()) {
        this.$router.push("/m");
        (function(doc, win) {
          var docEl = doc.documentElement,
            resizeEvt =
              "orientationchange" in window ? "orientationchange" : "resize",
            recalc = function() {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              if (clientWidth >= 750) {
                docEl.style.fontSize = "100px";
              } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
              }
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener("DOMContentLoaded", recalc, false);
        })(document, window);
      } else {
        this.$router.push("/HomePage");
      }
    }
  },
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
        return true;
      } else {
        return false;
      }
    },
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
