<template>
    <div>
        <div class="combined">
            <p>合计 :</p>
            <p class="totals">￥
                <span>{{getwxNum}}</span>
            </p>
        </div>
        <button @click="settlement">去结算</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getwxNum"])
  },
  created() {
    this.render();
  },
  data() {
    return {
      total: 0
    };
  },
  methods: {
    //默认渲染
    render() {
      var that = this;
      this.ajax.post("/xinda-api/cart/list").then(data => {
        this.cartList = data.data.data;
        var total = 0;
        for (var i in that.cartList) {
          total -= -that.cartList[i].totalPrice;
        }
        that.total = total;
      });
    },
    settlement() {
      this.ajax.post("xinda-api/cart/submit").then(data => {
        if (data.data.status == 1) {
          this.$router.push({ path: "/m/carts/Null" });
          this.render();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 1.1rem;
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: .10rem;
  .combined {
    width: 4.94rem;
    background: #e5e5e5;
    padding-left: 0.3rem;
    box-sizing: border-box;
    margin: 0;
    p {
      font-size: 0.28rem;
      letter-spacing: 0.02rem;
      line-height: 1.1rem;
      color: #4c4c4c;
    }
    .totals {
      color: #fe0000;
    }
  }
}
button {
  width: 2.56rem;
  background: #fb2d2d;
  font-size: 0.28rem;
  color: #fff;
  text-align: center;
  line-height: 1.1rem;
  border: none;
  outline: 0;
}
</style>
