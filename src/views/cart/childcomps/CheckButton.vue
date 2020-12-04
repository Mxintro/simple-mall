<template>
<div>
  <div class="icon-selector" :class="{'selector-active': checked || checkedAll}" @click="checkedClick">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    cartItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    checkedAll(){
      return this.$store.getters.checkedAll
    },
    checked(){
      return this.cartItem.checked ? this.cartItem.checked : false
    },
    
  },
  methods: {
    checkedClick(){
      if (Object.keys(this.cartItem).length !== 0) {
        this.$store.commit('checkedClick', this.cartItem.stockId)
      }else {
        this.$store.commit('selectAll')
      }
    }
  }

}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    /* cursor: pointer; */
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>