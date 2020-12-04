<template>
<div class="cart-list-item" v-if="Object.keys(cartItem).length !== 0">
  <div class="good-select">
    <check-button :cartItem="cartItem"></check-button>
  </div>
  <div class="good-img">
    <img :src="cartItem.img" alt=""></div>
  <div class="good-info">
    <div class="cart-title"
      @click="$router.push({path: '/detail', query: {iid: cartItem.goodIid}})">
      {{cartItem.title}}</div>
    <div class="cart-desc">商品描述:
      <span>{{cartItem.style}}</span>
      <span>{{cartItem.size}}</span>
    </div>
    <div class="price-count">
      <div class="now-price">￥{{getOrderCost(itemIndex)}}</div>
      <div class="cart-count">x{{cartItem.count}}</div>
      <div class="count">
        <span class=" iconfont icon-jian" @click="countHandle(-1)"></span>
        <div class="num">x{{cartItem.count}}</div>
        <span class=" iconfont icon-jia1" @click="countHandle(1)"></span>
      </div>
    </div>
    <span class="iconfont icon-x1" @click="deleteItem"></span>
  </div>
</div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "CartListItem",
  props:{
    cartItem: {
      type: Object,
      default: {}
    },
    itemIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      `getOrderCost`
    ])
  },
  methods: {
    ...mapMutations([
      'deleteCart',
      'cartCountHandler'
    ]),
    deleteItem() {
      this.deleteCart(this.itemIndex)
    },
    countHandle(num) {
      if(num < 0 && this.cartItem.count > 0){
        this.cartCountHandler({index: this.itemIndex, num: num})
      }else if(num > 0 && this.cartItem.count < this.cartItem.stock){
        this.cartCountHandler({index: this.itemIndex, num: num})
      }
    }
  }
}
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  height: 120px;
  padding: 10px 5px;

  display: flex;
 border-bottom: 1px solid #ccc;
}
.good-select {
  flex-shrink: 0;
  height: 100%;
  width: 18px;
  display: flex;
  align-items: center;
}
.good-img {
  /* height: 120px; */
  flex-shrink: 0;
  width: 80px;
  height: 100px;
  margin: 0 5px
}
.good-img img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.good-info {
  padding:0 10px;
  position: relative;
  overflow: hidden;
  font-size: 17px;
}
.good-info .icon-x1 
{
  position: absolute;
  top: 0;
  right: 0;
  width: 1.2rem;
}
.cart-title, .cart-desc {
  color: #333;
  padding-bottom: 10px;
  padding-right: 10px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cart-desc {
  font-size: 14px;
  color: rgb(102, 102, 102);
}
.cart-desc span {
  color: rgb(255, 129, 152);
  font-size: 13px;
  margin-left: 10px;
}
.price-count{
  display: flex;
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
  justify-content: space-between;
}
.count {
  display: flex;
  align-items: center;
}
.count .num {
  margin-left: 10px;
  margin-right: 10px;
}
.count .icon-jian {
  border: var(--color-high-text) 1.5px solid;
  border-radius: 2px;
  padding: 0 3px;
  color: var(--color-high-text);

}
.count .icon-jia1 {
  border: var(--color-high-text) 1.5px solid;
  border-radius: 2px;
  padding: 0 3px;
  background-color: var(--color-high-text);
  font-weight: 600;
  color: #ffffff;
}
.count .op-aticve {
  color: #ffffff;
  background-color: var(--color-high-text);
}

.now-price {
  color:rgb(255, 69, 0);
}
</style>