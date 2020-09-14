<template>
  <swiper>
    <swiper-item class="item" v-for="(item, index) in images" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
  
</template>

<script>
import {Swiper, SwiperItem} from 'common/swiper'

export default {
  name: "DetailSwiper",
  props: {
    images: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper, 
    SwiperItem
  }
}
</script>

<style scoped>
.item {
    /* text-align: center; */
    height: 300px;
  }

</style>