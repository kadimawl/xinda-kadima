<template>

  <div>
    <sele/>
    <!-- 产品列表及轮播 -->
    <div class="pro-nav">
      <!-- 轮播 -->
      <div class="block">
        <span class="demonstrantion"></span>
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in 4" :key="item">
            {{item}}
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--菜单 -->
      <div class="ItemList">
        <div class="Listleft">
          <div class="ListImg">
            <div class="ImgI"></div>
            <div class="ImgII"></div>
            <div class="ImgIII"></div>
            <div class="ImgIV"></div>
          </div>
          <div class="Listnames">
            <div class="listI" v-for="itemName in ItemLists" :key="itemName.name">
              <p class="ListNameI">
                <a href="">{{itemName.name}}</a>
              </p>
              <div class="listII" v-for="itemNameII in itemName.itemList" :key="itemNameII.name">
                <p>
                  <a href="">{{itemNameII.name}}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="Listright">
          <div v-for="itemName in ItemLists" :key="itemName.name" class="listIII">
            <div v-for="itemNameII in itemName.itemList" :key="itemNameII.name" class="listIII-s">
              <div class="ListNameII">
                <p>{{itemNameII.name}}></p>
              </div>
              <div class="ListNameIII">
                <div v-for="itemNameIII in itemNameII.itemList" :key="itemNameIII.name">
                  <p>
                    <a href="">{{itemNameIII.name}}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import sele from '@/components/sele'
export default {
components: { sele },
  created() {
    // console.log('bottom model is created')
    var that = this;
    this.ajax
      .post("http://115.182.107.203:8088/xinda/xinda-api/product/style/list")
      .then(function(data) {
        // console.log(data);
        var rData = data.data.data;
        that.ItemLists = rData;
        console.log(that.ItemLists);
      });
  },
  data() {
    return {
      ItemLists: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.pro-nav {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  position: relative;
}
.el-carousel {
  width: 1200px;
  height: 400px;
  .el-carousel__item h3 {
    color: red;
    font-size: 20px;
    line-height: 400px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: blueviolet;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: green;
  }
}
.ItemList {
  width: 1200px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
}
.Listleft {
  width: 200px;
  height: 400px;
  background-color: #132336;
  position: relative;
}
.ListImg {
  width: 30px;
  height: 360px;
  margin-top: 20px;
  .ImgI {
    width: 30px;
    height: 35px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -73px;
  }
  .ImgII {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -167px;
  }
  .ImgIII {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -119px;
  }
  .ImgIV {
    width: 30px;
    height: 35px;
    margin-top: 65px;
    margin-left: 5px;
    background: url(../../assets/HomePageimages/Sprites.png) no-repeat -50px -230px;
  }
}
.Listnames {
  width: 160px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 40px;
}
.listI {
  width: 160px;
  height: 80px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  .ListNameI {
    width: 160px;
    height: 20px;
    line-height: 20px;
    a {
      font-size: 16px;
      color: #fff;
      text-decoration: none;
    }
  }
  .listII {
    p {
      margin-right: 20px;
      a {
        text-decoration: none;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
.Listright {
  width: 1000px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  .listIII {
    width: 1000px;
    height: 100px;
    line-height: 100px;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    .listIII-s {
      width: 1000px;
      height: 40px;
      display: flex;
      align-content: space-around;
      margin-top: 10px;
    }
    .ListNameII {
      margin-top:10px;
      height: 20px;
      p {
        height: 16px;
        font-size: 14px;
        color: #fff;
        line-height: 16px;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    .ListNameIII {
      width: 900px;
      height: 20px;
      margin-top:10px;
      display: flex;
      flex-wrap: wrap;
      p {
        height: 16px;
        border-left: 1px solid #fff;
        line-height: 16px;
        a {
          text-decoration: none;
          font-size: 14px;
          color: #fff;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>