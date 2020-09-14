<template>
  <div class="gategory-menu">
    <div class="menu-item"
         :class = "{active: index === currentIndex}"
         v-for="(item, index) in categoryList" :key="index"
         @click="itemClick(index)">
         {{item.title}}
         </div>
  </div>
</template>

<script>
export default {
  name: "CategoryMenu",

  props: {
    categoryList: {
      type: Array,
      default: []
    }
  },

  data(){
    return {
      currentIndex: 0 
    }
  },

  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
.gategory-menu {
  background-color: #f6f6f6;
  display: flex;
  width: 100px;
  flex-flow: column;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  text-align: center;
}
.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>