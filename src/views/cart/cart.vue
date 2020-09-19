<template>
<div class="shop-cart">
  <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
  <cart-list :cartList="cartList"></cart-list>
  <bottom-bar :cartList="cartList"></bottom-bar>

</div>

  
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childcomps/CartList'

import BottomBar from './childcomps/BottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartCount'
    ])
  }

}
</script>

<style scoped>
  .nav-bar {
    background:  rgb(255, 129, 152);
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
  }

</style>