<template>
<div class="cart-bottom">
  <div class="select-all">
    <check-button></check-button>
    <div>全选</div>
  </div>
  <div class="tatol-cost">合计：￥{{getTotalCost}}</div>
  <div class="order-settle" @click="submitOrder">去结算（{{cartCount}}）</div>
</div>
</template>
 
<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: "BottomBar",
  props: {
    cartList: {
      type: Array,
      default: []
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      'cartCount',
      'getTotalCost'
    ])
  },
  methods: {
    submitOrder() {
      this.$emit('orderClick')
    }
  }
}
</script>

<style scoped>
  .cart-bottom {
    position: fixed;
    height: 44px;
    line-height: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color:rgb(238, 238, 238);
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    display: flex;
    font-size: 14px;
  }
  .select-all {
    flex-shrink: 0;
    width: 58px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    line-height: 0px;
    
  }
  .tatol-cost {
    margin-left: 15px;
    flex-grow: 1;
    font-size: 16px;
  }
  .order-settle {
    padding: 0 10px;
    flex-shrink: 0;
    background: rgb(255, 69, 0);
    color: rgb(255, 255, 255);
  }
</style>
