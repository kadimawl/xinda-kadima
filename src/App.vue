<template>
  <div id="app">
    <router-view @userSignIn="userSignIn"></router-view>
  </div>
</template>


<script>
export default {
  name: "app",
  created() {
    
  },
  methods: {
    
    //子组件(login)将用户名传过来
    userSignIn(userName) {
      sessionStorage.userName = userName;
      this.userName = sessionStorage.userName;
    }
  },
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
