 <template>
<div class="cart-list">
  <div v-for="(item,index) in cartList" :key="index">
    <cart-list-item :cartItem="item" :itemIndex="index"></cart-list-item>
  </div>
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