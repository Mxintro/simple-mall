<template>
<div class="category-content">
  <div class="grid-item"
       v-for="(item, index) in categoryContent" 
       :key="index">
    <a :href="item.link">
      <img v-lazy="item.image" alt="">
      <div class="item-title">{{item.title}}</div>
    </a>    
  </div>
</div>
</template>

<script>
export default {
  name: "CategoryContentTab",
  props: {
    categoryContent: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.category-content {
  width: 100%;
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, 82px);
  padding-left: 20px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 12px;
}
.grid-item img{
  width: 80%;
}
</style>