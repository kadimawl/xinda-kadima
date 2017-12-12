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
    return{
       userName: sessionStorage.userName
    }
  },
  name: "app",
  methods:{
    //子组件(login)将用户名传过来
    userSignIn(userName){
      sessionStorage.userName = userName;
      this.userName = sessionStorage.userName;
    }
  }
};
</script>

<style lang="less">
<<<<<<< HEAD
* {
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
=======
  *{
    margin: 0;
    padding: 0;
  }
  button{
    outline:0;
  }
>>>>>>> 69b99f888140cdff93e7ba8a109c4d79372323a9
</style>
