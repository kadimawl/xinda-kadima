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
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // window.location.href = "#/";
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
      // window.location.href = "#/m.sinda";
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
