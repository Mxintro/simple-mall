f<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="middle-left">
        <div class="info-sell">
          <div class="count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="count">
            {{shop.goodsCount}}
          </div>
          <div class="text">全部宝贝</div>
        </div>
      </div>
      <div class="middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'high-score': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'isbetter': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      score:[]
    }
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  },
  
  
}
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top {
    height: 45px;
    line-height: 45px;
  }
  .shop-top img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
    vertical-align: -14.5px;
    
  }
  .shop-top span {
    display: inline-block;
    margin-left: 10px;
    font-size: 16px;
  }

  .shop-middle {
    display: flex;
    margin-top: 15px;
    align-items: center;
  }
  .middle-left {
    flex: 1;
    display: flex;
    text-align: center;
    color: #333;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .middle-left .info-sell, .info-goods{
    flex:1
  }
  .middle-left .count{
    font-size: 18px;
  }
  .middle-left .text{
    margin-top: 10px;
    font-size: 12px;
  }

  .middle-right {
    flex: 1;
    color: #333;
    font-size: 13px;
 
  }

  .middle-right .score {
    color: #5ea732;
  }

  .middle-right .high-score {
    color: #f13e3a;
  }

  .middle-right .better {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .middle-right .isbetter{
    background-color: #f13e3a;
  }
  .middle-right table {
    width: 120px;
    margin-left: 30px;
  }
  .middle-right table td {
    padding: 5px 0;
  }
  .shop-bottom {
    margin: 10px;
    text-align: center;
  }
  .enter-shop {
    font-size: 14px;
    display: inline-block;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
  }
</style>