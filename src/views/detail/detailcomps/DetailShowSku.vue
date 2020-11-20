<template>
<div v-if="isVisible">
  <div class="cover" @click.stop="cleanDialog"></div>
  <div id="sku-container">
    <div class="sku-top">
      <img src="" alt="">
      <div class="sku-info"><span>请选择：</span></div>
    </div>
    <div class="sku-middle">
      <div class="color-info">
        <div class="sku-middli-font">颜色/样式：</div>
        <div class="color-list">
          <div class="color-size-btn"
            v-for="(color, j) in skuInfos.color"
            :key="j"
            :class="{active: colorIndex === j}"
            @click="colorIndex = j"> {{color.name}}</div>
        </div>
      </div>
      <div class="sizes-info">
        <div class="sku-middli-font">尺码：</div>
        <div class="sizes-list">
          <div class="color-size-btn"
            v-for="(size, i) in skuInfos.sizes"
            :key="i"
            :class="{active: sizeIndex === i}"
            @click="sizeIndex = i"> {{size.name}}</div>
        </div>
      </div>
      <div class="count-num">
        <div class="sku-middli-font">数量</div>
        <div class="num-button">
          <div class="num-left">-</div>
          <div class="num-center"></div>
          <div class="num-right">+</div>
        </div>
      </div>
    </div>
    <div class="sku-bottom">确定</div>
  </div>
</div>

</template>

<script>
export default {
  name: 'DetailShowSku',
  data() {
    return {
      skuDom: {},
      slectedColor: '',
      colorIndex: 0,
      sizeIndex: 0,
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
    slideUp() {
      if (this.skuDom) {
        this.skuDom.style.transition = 'transform ' + '400ms'
        if (this.isVisible) {
          this.skuDom.style.transform = 'translateY(-22rem)'
        }
      }
    },
    cleanDialog() {
      this.skuDom.style.transform = 'translateY(22rem)'
      setTimeout(() => {
        this.$emit('update:isVisible', false) //注意空格
      },420)
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
  width: 100%;
  height: 22rem;
  top: 100%;
  z-index: 1000;
  background-color: #fff;
}
#sku-container .sku-top {
  height: 6rem;
}
#sku-container .sku-middle {
  margin: 0 10px;
  height: 12rem;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  justify-content: space-between;
}
#sku-container .sku-bottom {
  height: 3rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 3rem;
  text-align: center;
  background-color: #ff4b8a;
  color: #fff;
}
.sku-middle .color-list {
  display: flex;
  /* justify-content: start; */
  flex-wrap: wrap;
}
.sku-middle .color-size-btn {
  margin: 5px 10px 5px 0px;
  background-color: #fff;
  border: #c2c2c2 0.5px solid;
  padding: 5px;
  font-size: 12px;
  border-radius: 4px; 
}
.sku-middle .sizes-list {
  display: flex;
  /* justify-content: start; */
  flex-wrap: wrap;
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
}
.active {
  color: #ff4b8a;
  background:rgb(243, 238, 238)!important;
}
</style>
