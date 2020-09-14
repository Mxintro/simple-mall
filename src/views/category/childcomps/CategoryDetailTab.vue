<template>
<div class="category-detail" v-if="categoryDetail.length !== 0">
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :goods="item" :key="index">      
    </goods-list-item>
  </grid-view>

</div>
</template>

<script>
  import GridView from 'common/gridView/GridView'
  import GoodsListItem from 'views/home/childcomps/GoodsListItem'
  
  export default {
    name: "CategoryDetailTab",
    components: {
      GridView,
      GoodsListItem,
    },
    props: {
      categoryDetail: {
        type: Array,
        default: []
      }
    }
  }
  </script>

<style scoped>
</style>