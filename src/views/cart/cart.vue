<template>
<div class="shop-cart">
  <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
  <cart-list :cartList="cartList"></cart-list>
  <bottom-bar :cartList="cartList" @orderClick="orderHandler"></bottom-bar>
  <pay-view
    :payViewShow.sync="showPayView"
    :orderAmount="getTotalCost"
    @orderConfirm="orderSubmit">
  </pay-view>
  <toast-com :toastShow.sync="orderEnd">
    <div :class="['iconfont', isSuccess ? 'icon-chenggong' : 'icon-shibai']">
      {{logMessage}}
    </div>
  </toast-com>
</div>

</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childcomps/CartList'
import BottomBar from './childcomps/BottomBar'
import PayView from './childcomps/PayView'
import ToastCom from 'common/toast/ToastCom'

import { mapGetters } from 'vuex'

import { postOrders } from 'network/order'

export default {
  name: 'Cart',
  data() {
    return {
      showPayView:false,
      isSuccess: false,
      logMessage: 'eee',
      orderEnd: false,
    }
  },
  components: {
    NavBar,
    CartList,
    BottomBar,
    PayView,
    ToastCom
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartCount',
      'getOrderCost',
      'getTotalCost'
    ])
  },
  methods: {
    orderHandler() {
      this.showPayView = true
    },
    orderSubmit(){
      if (this.cartCount === 0) {
        return
      }
      const uid = window.sessionStorage.getItem('uid')
      const token = window.sessionStorage.getItem('token')
      if (!uid || !token){
        this.$router.push('/login')
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
        console.log(res)
        this.isSuccess = true
        this.logMessage = '支付成功'
        this.orderEnd = true
        setTimeout(() => {
          this.showPayView = false
        },1100) 
      }).catch(err=>{
        this.isSuccess = false
        this.logMessage = "操作失败"
        this.orderEnd = true
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