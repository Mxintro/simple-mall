<template>
<div class="order-list-item" v-if="Object.keys(orderItem).length !== 0">
  <div class="order-info">
    <div class="order-title">
      {{orderItem.title}}</div>
    <div class="order-desc">商品描述:
      <span>{{orderItem.style}}</span>
      <span>{{orderItem.size}}</span>
      <span class="num">共{{orderItem.count}}件</span>
    </div>

    <div class="order-more">
      <div class="order-time-id">
        <div>订单编号：{{orderItem.orderId}}</div>
        <div>创建时间：{{createTime}}</div>
      </div>
      <div class="now-price">
        <span>合计实付:</span>
        ￥{{orderItem.cost}}</div>
    </div>
  </div>
</div>
</template>

<script>
import { formatDate } from '@/common/utils'

export default {
  name: "OrderItem",
  props:{
    orderItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    createTime(){
      const date = new Date(this.orderItem.create_time*1000)
      return formatDate(date, 'yyyy-MM-dd  hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.order-list-item {
  width: 100%;
  height: 110px;
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
}

.order-info {
  position: relative;
  overflow: hidden;
  font-size: 17px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.order-title, .order-desc {
  color: #333;
  padding-bottom: 10px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.order-desc {
  font-size: 14px;
  color: var(--color-text)
}
.order-desc .num{
  float: right;
  font-size: 14px;
}
.order-desc span {
  color: rgb(255, 129, 152);
  font-size: 13px;
  margin-left: 10px;
}
.order-more {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.order-time-id :nth-child(0)  {
  margin-bottom: 5px;
}
.order-more .now-price {
  font-size: 18px;
  color:rgb(255, 69, 0)
}
.now-price span{
  font-size: 14px;
  color: var(--color-text)
}
</style>