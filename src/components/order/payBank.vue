<template>
  <div class="pay">
      
  </div>
</template>

<script>
export default {
    mounted(){
      var pay=document.querySelector('.pay');
      var payfor=sessionStorage.getItem('payfor');
      // console.log('payfor==',payfor);
      pay.innerHTML=payfor.substring(
        payfor.indexOf('<form'),
        payfor.indexOf('/form>')+6
      );
      var getid=document.querySelector('#pay_form');
      if(getid){
        getid.submit();
      }else{
         getid=document.querySelector('#alipaysubmit');
         getid.submit();
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>