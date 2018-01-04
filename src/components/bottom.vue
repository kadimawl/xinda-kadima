<template>
  <div class="Bottom">
        <div class="bottom">
            <div>
                <h5>关于我们</h5>
                <P>联系我们：contact@xinkehr.com</P>
                <P>公司地址：北京市朝阳区大望路soho现代城5号楼2004室</P>
                <P>官方客服电话：
                    <a href="javascript:void(0)">010-83421842</a>
                </P>
            </div>
            <div>
                <!-- <h5>&nbsp</h5> -->
                <P>&nbsp</P>
                <P>&nbsp</P>
                <P>&nbsp</P>
                <P>&nbsp</P>
                <p>©Copyright 2016 北京信达科技有限公司 京ICP备 16011621号</p>
            </div>
            <div>
                <img sr="../assets/index/u265.png" c alt="">
            </div>
            <div>
                <P>&nbsp</P>
                <P>&nbsp</P>              
                <p>扫描二维码</p>
                <p>关注我们</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
      return {
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Bottom {
  background: rgba(242, 242, 242, 0.6);
  padding: 20px;
  .bottom {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
  }
}
.bottom {
  div {
    text-align: left;
    h5 {
      font-size: 14px;
      color: #333333;
    }
    p {
      font-size: 14px;
      color: #bcbcbc;
      margin-right: 50px;
    }
    a {
      font-size: 14px;
      color: #6699cc;
      text-decoration: none;
    }
    img {
      margin: 30px 10px 0 100px;
    }
  }
}
</style>
