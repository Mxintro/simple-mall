<template>
<div class="cart-list">
  <div v-for="(item,index) in cartList" :key="index"></div>
</div>
</template>

<script>
import CartListItem from './CartListItem'
export default {
  name: "cartList",
  props: {
    cartList:{
      type: Array,
      default: []
    }
  },
  components: {
    CartListItem
  }
}
</script>

<style scoped>
</style>