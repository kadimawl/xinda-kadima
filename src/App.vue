<template>
  <div id="app">
    <keep-alive>
      <router-view @userSignIn="userSignIn"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
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
}
input {
  padding: 5px;
}
</style>
