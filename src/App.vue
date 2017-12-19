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
