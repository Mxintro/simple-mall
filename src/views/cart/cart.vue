<template>
<div class="shop-cart">
  <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
</div>

  
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childcomps/CartList'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
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