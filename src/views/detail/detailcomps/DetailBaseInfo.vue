<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns">
      <span>{{goods.columns[0]}}</span>
      <!-- <span>{{goods.columns[0]}}</span>返回错误但读取成功 
      解决办法：v-if="Object.keys(goods).length !== 0"判断再渲染-->
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: {}
    
    }
  },//问题：props和data机制，data初次加载取不到props
  
}
</script>

<style scoped>

  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    font-size: 16px;
    color: #222
  }
  .price  {
    margin-top: 10px;
  }
  .price .new-price {
      font-size: 24px;
      color: var(--color-high-text);
  }
  .price .old-price {
      font-size: 13px;
      margin-left: 5px;
      text-decoration: line-through;
  }
  .price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff; 
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }
  .columns {
    display: flex;
    justify-content: space-between;

    margin-top: 15px;
    font-size: 13px;
    color:rgb(153, 153, 153);
    line-height: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .services {
    display: flex;
    justify-content: space-around;

    line-height: 60px;
  }
  .info-service-item {
    font-size: 13px;
    color: #333;
  }
  .info-service-item img{
    
    height: 14px;
    width: 14px;
    vertical-align: -2px;
  }





</style>