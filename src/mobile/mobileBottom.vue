<template>
    <div class="mBottom">
        <ul>
            <li :class="[istrue?'active':'']">
                <a href="javascript:void(0)">
                    <div class="bg bgIndex"></div>
                    <p>首页</p>
                </a>

            </li>
            <li>
                <a href="javascript:void(0)">
                    <div class="bg bgShop"></div>
                    <p>店铺</p>
                </a>

            </li>
            <li>
                <a href="javascript:void(0)">
                    <div class="bg bgCart"></div>
                    <p>购物车</p>
                </a>

            </li>
            <li>
                <a href="javascript:void(0)">
                    <div class="bg bgMine"></div>
                    <p>我的</p>
                </a>

            </li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.mBottom {
  height: 88px;
  width: 100%;
  border-top: 2px solid #f9f9f9;
}
ul {
  width: 100%;
  display: flex;
  list-style: none;
  li {
    width: 25%;
    height: 88px;
    cursor: pointer;
    a {
      text-decoration: none;
      color: #b0b0b2;
    }
    div {
      width: 35px;
      height: 35px;
      margin: 7px auto 12px;
      background: url(../assets/mobile/mobileS.png);
    }
    .bgIndex {
      background-position: -12px -316px;
    }
    .bgShop {
      background-position: -72px -316px;
    }
    .bgCart {
      background-position: -127px -316px;
    }
    .bgMine {
      background-position: -205px -316px;
    }
    p {
      width: 100%;
      font-size: 23px;
      text-align: center;
    }
  }
}

.active{
    color: #2693d4;
    div{
        background: url(../assets/mobile/mobileS.png);
        background-position: 12px -377px;
    }
}
</style>
