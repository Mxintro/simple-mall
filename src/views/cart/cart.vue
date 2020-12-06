<template>
<div class="shop-cart">
  <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
  <cart-list :cartList="cartList"></cart-list>
  <bottom-bar :cartList="cartList" @orderClick="orderSubmit"></bottom-bar>
  <pay-view
    :payViewShow="showPayView">fffffffff</pay-view>
</div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childcomps/CartList'
import BottomBar from './childcomps/BottomBar'
import PayView from './childcomps/PayView'

import { mapGetters } from 'vuex'

import { postOrders } from 'network/order'

export default {
  name: 'Cart',
  data() {
    return {
      showPayView:true
    }
  },
  components: {
    NavBar,
    CartList,
    BottomBar,
    PayView
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartCount',
      'getOrderCost'
    ])
  },
  methods: {
    orderSubmit(){
      if (this.cartCount === 0) {
        return
      }
      const uid = window.sessionStorage.getItem('uid')
      const token = window.sessionStorage.getItem('token')
      if (!uid || !token){
        console.log('未登录');
        return
      }
      
      const orderList = []
      this.cartList.forEach((item,index) => {
        if (item.checked) {
          const {title, goodIid, nowprice, count, style, size} = item
          const order = {title, goodIid, nowprice, count, style, size}
          order.uid = uid
          order.cost = this.getOrderCost(index)
          order.create_time = Math.floor(Date.now()/1000)
          orderList.push(order)
        }
      })
      console.log(orderList);
      postOrders(orderList).then(res => {
        console.log(res);
      }).catch(err=>{
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
}

</style>