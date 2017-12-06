<template>
<div class="myorder">
    <div class="topname">
      <p>我的订单</p>
    </div>
    <div class="search">
        <p>订单号：</p><input type="text" placeholder="请输入订单号搜索"> <button>搜索</button>
    </div>
    <div class="time">
      <p>创建时间：</p><input type="text" class="startt"><span></span><input type="text" class="endt"><span></span>
    </div>
    <div class="list">
      <p class="name">商品名称</p>
      <p class="unitprice">单价</p>
      <p class="amount">数量</p>
      <p class="sum">总金额</p>
      <p class="orderStatus">订单状态</p>
      <p class="orderHandle">订单操作</p>
    </div>
    <div class="listtop tables">
        <div class="codetime"><p>订单号：{{ordercode}}</p><p>下单时间：{{ordertime}}</p></div>
        <div class="all">
             <div class="allleft">
                 <div class="alFirst cengstyle">
                     <div></div>
                     <p class="small"></p>
                     <p class="small"></p>
                     <p class="big"></p>
                     <p class="big"></p>
                 </div>
                 <div class="alSecond cengstyle">
                      <div></div>
                     <p class="small"></p>
                     <p class="small"></p>
                     <p class="big"></p>
                     <p class="big"></p>
                 </div>
             </div>
             <div class="allright">
                 <button>付款</button><br>
                 <span>删除订单</span>
             </div>
        </div>
    </div>
    <div class="listbot tables">
        <div class="codetime"><p>订单号：{{ordercode}}</p><p>下单时间：{{ordertime}}</p></div>
        <div class="all">
             <div class="allleft">
                 <div class="alFirst cengstyle">
                     <div></div>
                     <p class="small"></p>
                     <p class="small"></p>
                     <p class="big"></p>
                     <p class="big"></p>
                 </div>
                 <div class="alSecond cengstyle">
                      <div></div>
                     <p class="small"></p>
                     <p class="small"></p>
                     <p class="big"></p>
                     <p class="big"></p>
                 </div>
             </div>
             <div class="allright">
                 <button>付款</button><br>
                 <span>删除订单</span>
             </div>
        </div>
    </div>
    <pageturn/>
</div>
 
  
</template>

<script>
import pageturn from './pageturn'
export default {
    // created(){
    //     this.ajax.post('http://115.182.107.203:8088/xinda/xinda-api/business-order/grid',{
    //         businessNo:'1',
    //         startTime:'2017-03-28',
    //         endTime:'2017-03-28',
    //         start:'0'
    //     })
    //     .then(function(aa){
    //         console.log(aa);
    //     })
    // },
    data() {
        return {
            ordercode:'未知',
            ordertime:'2017-2-23'
        };
    },
    components:{pageturn}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.myorder{
    width: 970px;
    height: 660px;
    margin-left: 30px;
    margin-top: 30px;
    display: block;
    flex-direction: column;
    .topname{
        width: 90%;
        height: 32px;
        border-bottom: 2px solid #e9e9e9;
        text-align: center;
        margin-bottom: 16px;
        p{
            width: 115px;
            color: #73b2de;
            height: 32px;
            z-index: 5;
            line-height: 32px;
            font-size: 16px;
            border-bottom: 2px solid #2693d4;
        }
    }
    .search{
        height: 25px;
        line-height: 30px;
        display: flex;
        margin-top:25px;
        p{
            color: #888888;
            margin-right: 20px;
        }
        input{
            width: 265px;
            height: 24px;
            border: 1px solid #b0b0b0;
        }
        button{
            width: 72px;
            height: 26px;
            border: 1px solid #2693d4;
            border-radius: 4px;
            margin-left: 12px;
            background: #ffffff;
            color: #66a9dd;
            box-shadow:0 0 1px 1px #66a9dd ;
        }
    }
    .time{
        height: 20px;
        display: flex;
        margin: 30px 0;
        line-height:30px;
        p{
            color: #888888;
            margin-right: 4px;
        }
        input{
            width: 113px;
            height: 24px;
            border: 1px solid #b0b0b0;
        }
        span{
            display: block;
            width:26px;
            background: url('../assets/index/memCen.png') no-repeat;
            background-position: -25px -222px;
            height: 20px;
            position: relative;
            left: -26px;
            top: 2px;
        }
    }
    .list{
        display: flex;
        width: 932px;
        height: 32px;
        background: #f7f7f7;
        margin-bottom: 10px;
        p{
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            font-weight: bold;
        }
        .name{
            width: 320px;
           padding-left: 40px;
        }
        .unitprice{
            width: 110px;
            text-align: center;
        }
        .amount{
            width: 110px;
            text-align: center;
        }
        .sum{
            width: 142px;
            text-align: center;
        }
        .orderStatus{
            width: 142px;
            text-align: center;
        }
        .orderHandle{
            width: 120px;
            text-align: center;
        }
    }
    .tables{
        width: 940px;
        height: 172px;
        .codetime{
            width: 100%;
            height: 40px;
            display: flex;
            background: #f7f7f7;
            p{
                line-height: 30px;
                margin-left: 20px;
            }
        }
        .all{
            width: 940px;
            height: 133px;
            display: flex;
            .allleft{
                height: 100%;
                width: 822px;
                .cengstyle{
                    width: 100%;
                    height: 67px;
                    div{
                        width: 319px;
                        height: 67px;
                        line-height: 67px;
                        display: flex;
                        img{
                            display: block;
                            margin:auto 15px;
                        }
                        p{
                            width: 100px;
                            height: 67px;
                        }
                    }
                    p{  
                        height: 67px;
                        line-height: 67px;
                        text-align: center;
                    }
                    .small{
                        width: 110px;
                    }
                    .big{
                        width: 142px;
                    }
                }
                .alFirst{
                    border: 1px solid #f7f7f7;
                }
            }
            .allright{
                height: 100%;
                width: 134px;
                text-align: center;
                button{
                    width: 57px;
                    height: 24px;
                    color: #2693d4;
                    border: 1px solid #2693d4;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    margin-top: 45px;
                    background: #ffffff;
                }
                span{
                    font-size: 14px;
                    color: #ff7d7b;
                }
            }
        }
    }
    
}
</style>
