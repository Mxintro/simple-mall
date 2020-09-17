<template>
<div class="cart-list-item" v-if="Object.key(cartItem).length !== 0">
  <div class="good-select">
    <check-button></check-button>
  </div>
  <div class="good-img">
    <img :src="cartItem.img" alt=""></div>
  <div class="good-info">
    <div class="cart-desc"></div>
    <div class="new-price"></div>
    <div class="cart-count"></div>
  </div>
</div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: "CartListItem",
  props:{
    cartItem: {
      type: Object,
      default: {}
    }
  },
  components: {
    CheckButton
  }
}
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  height: 150px;

  display: flex;
}
.good-select {
  height: 100%;
  width: 40px;
}
.good-img {
  /* height: 120px; */
  width: 120px;
}
.good-img img {
  height: 100%;
  width: 100%;
}
</style>