<template>
<div class="cart-list-item" v-if="Object.key(cartItem).length !== 0">
  <div class="good-select">
    <check-button></check-button>
  </div>
  <div class="good-img"></div>
  <div class="good-info"></div>
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
</style>