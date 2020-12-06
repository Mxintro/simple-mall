<template>
<div id="user-order">
  <nav-bar class="nav-bar">
    <img slot="left" @click="backClick" src="~assets/img/common/back.svg" alt="">
    <div slot="center">订单</div>
  </nav-bar>
  <scroll 
    class="content"
    ref="scroll"
    :data="[orderList]"
    :probe-type="3"
    :pull-up-load="true">
    <div>
      <order-item
        v-for="(item, index) in orderList"
        :key="index"
        :orderItem="item"></order-item>
      </div>
  </scroll>
</div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import Scroll from 'common/scroll/Scroll'

import OrderItem from './OrderItem'

import { getOrders } from 'network/order'

export default {
  name: 'Order',
  data() {
    return {
      orderList: []
    }
  },
  components: {
    NavBar,
    OrderItem,
    Scroll
  },
  created() {
    this.getOrdersList()
  },
  activated(){
    this.getOrdersList()
  },
  methods: {
    backClick(){
      this.$router.back()
    },
    async getOrdersList(){
      const uid = window.sessionStorage.getItem('uid')
      console.log(uid);
      if (!uid) {
        return 
      }
      try {
        const res = await getOrders({uid})
        console.log(res);
        this.orderList = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.content {
  position: fixed;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
.nav-bar {
  background: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  position: fixed !important;
  top: 0;
  width: 100%;
  z-index: 10;
}
</style>
