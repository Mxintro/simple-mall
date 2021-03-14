<template>
<div v-if="isVisible">
  <div class="cover" @click.stop="cleanDialog"></div>
  <div id="sku-container">
    <div class="sku-top">
      <div class="img-container">
        <img :src="currentSku.img" alt="">
      </div>
      <div class="sku-info">
        <div class="price">{{Number(currentSku.nowprice/100).toFixed(2)}}</div>
        <div>库存{{currentSku.stock}}件</div>
        <div>请选择：颜色  尺码</div>
      </div>
      <img class="cancelDailog" src="~assets/img/detail/cancel.png" @click="cleanDialog">
    </div>
    <div class="sku-middle">
      <div class="color-info">
        <div class="sku-middli-font">颜色/样式：</div>
        <div class="color-list">
          <div class="color-size-btn"
            v-for="(color, j) in skuInfos.color"
            :key="j"
            :class="{active: colorIndex === j}"
            @click="colorIndex=j; goodsCount=0"> {{color.name}}</div>
        </div>
      </div>
      <div class="sizes-info">
        <div class="sku-middli-font">尺码：</div>
        <div class="sizes-list">
          <div class="color-size-btn"
            v-for="(size, i) in skuInfos.sizes"
            :key="i"
            :class="{active: sizeIndex === i}"
            @click="sizeIndex = i; goodsCount=0"> {{size.name}}</div>
        </div>
      </div>
      <div class="count-num">
        <div class="sku-middli-font">数量</div>
        <div class="num-button">
          <div class="num-left" @click="numDecrease" :class="{active: countOper==='de'}">-</div>
          <div class="num-center"><input type="text" v-model="goodsCount"></div>
          <div class="num-right" @click="numIncrease" :class="{active: countOper==='in'}">+</div>
        </div>
      </div>
    </div>
    <div class="sku-bottom" @click="submitGoods">确定</div>
  </div>
</div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'DetailShowSku',
  data() {
    return {
      skuDom: {},
      slectedColor: '',
      colorIndex: 0,
      sizeIndex: 0,
      goodsCount: 0,
      countOper: ''
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    skuInfos: {
      type: Object,
      default() {
        return {}
      }
    },
    goodTitle: {
      type: String,
      default: ''
    },
    entryType: {
      type: Boolean,
      default: false
    },
    goodIid: {
      type: String,
      default: ''
    }
  },

  computed: {
    styleId() {
      return this.skuInfos.color[this.colorIndex].styleId
    },
    sizeId() {
      return this.skuInfos.sizes[this.sizeIndex].sizeId
    },
    currentSku() {
      return this.skuInfos.skus.find(item => {
        return item.styleId === this.styleId && item.sizeId === this.sizeId
      })
    }
  },
  updated() {
    this.skuDom = this.isVisible ? document.querySelector('#sku-container') : ''
    setTimeout(() => {
      this.slideUp()     
    }, 100);
  },

  methods: {
    ...mapMutations([
      'addCart'
    ]),
    slideUp() {
      if (this.skuDom) {
        this.skuDom.style.transition = 'transform ' + '400ms'
        if (this.isVisible) {
          this.skuDom.style.transform = 'translateY(-24rem)'
        }
      }
    },
    cleanDialog() {
      this.skuDom.style.transform = 'translateY(24rem)'
      setTimeout(() => {
        this.$emit('update:isVisible', false) //注意空格
      },200)
    },
    numDecrease() {
      if (this.goodsCount > 0) {
        this.goodsCount--
      }
      this.countOper = 'de'
    },
    numIncrease() {
      if (this.goodsCount < this.currentSku.stock) {
        this.goodsCount++
      }
      this.countOper = 'in'
    },
    submitGoods() {
      if (this.goodsCount > 0) {
        const cartItem = { ...this.currentSku }
        cartItem.title = this.goodTitle
        cartItem.count = this.goodsCount
        cartItem.goodIid = this.goodIid
        cartItem.nowprice = Number(cartItem.nowprice/100).toFixed(2)
        this.addCart(cartItem)
        if (this.entryType) {
          this.$router.push('/cart')
          this.$emit('update: entryType',false)
        }
      } 
      this.cleanDialog()
    }
  }
}
</script>

<style scoped>
.cover {
  position: fixed;
  background: #000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  /* filter: alpha(opacity=30); */
  opacity: 0.3;
  z-index: 10;
}
#sku-container {
  position:fixed;
  /* display: flex;
  flex-direction: column; */
  width: 100%;
  height: 24rem;
  top: 100%;
  z-index: 1000;
  background-color: #fff;
}
#sku-container .sku-top {
  height: 5.5rem;
}
#sku-container .sku-middle {
  margin: 0 10px;
  height: 15rem;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  justify-content: space-between;
}

.sku-top .img-container {
  float: left;
  position: relative;
  width: 8rem;
  height: 5.5rem;
}
.sku-top .img-container img {
  position: absolute;
  bottom: 0.5rem;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: -40px;
  width: 5.5rem;
  height: auto;
}
.sku-top .sku-info {
  float: left;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  line-height: 1;
}
.sku-top .sku-info div {
  flex: 1;
  line-height: 1.3;
}
.sku-top .sku-info .price {
  font-size: 2rem;
}
.sku-top .sku-info .price::before {
  content: '￥';
  font-size: 10px;
  float: left;
  margin-top: 0.5rem;
}
.sku-top .cancelDailog {
  float: right;
  margin-top: 1rem;
  margin-right: 1.2rem;
  width: 1.2rem;
  color: #ff4b8a;
}
.sku-middle .color-info {
  flex: 1;
  padding-top: 5px;
}
.sku-middle .sizes-info{
  flex: 1;
  padding-top: 5px;
}
.sku-middle .count-num {
  flex: 1;
  padding-top: 5px;
}
.sku-middle .color-list {
  display: flex;
  flex-wrap: wrap;
  height: 4rem;
  overflow-y: auto;
}
.sku-middle .sizes-list {
  display: flex;
  flex-wrap: wrap;
}
.sku-middle .color-size-btn {
  flex-shrink: 1;
  height: 1.4rem;
  line-height: 1.4rem;
  margin-top: 5px;
  margin-right: 10px;
  background-color: #fff;
  border: #c2c2c2 0.5px solid;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  border-radius: 4px; 
}
.sku-middle .num-button {
  display: flex;
  width: 7rem;
  margin-top: 5px;
  background-color: #fff;
  border: #c2c2c2 0.5px solid;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  border-radius: 4px; 
}
.sku-middle .num-button div {
  flex: 1;
}
.sku-middle .num-button .num-center {
  border: solid 1px #c2c2c2;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  display: flex;
}
.sku-middle .num-button .num-center input {
  background:none;  
	outline:none;  
	border:0px;
  text-align: center;
  width: 100%;
  font-size: 15px;
  height: auto;
}
#sku-container .sku-bottom {
  height: 3.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 3.5rem;
  text-align: center;
  background-color: var(--color-high-text);
  color: #fff;
}
.active {
  color: #fff;
  background:var(--color-tint)!important;
  border-radius: 4px;
}
</style>
