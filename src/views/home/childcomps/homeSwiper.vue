<template>
<div>
  <swiper v-if="Object.keys(banners).length !==0" ref="swiper">
    <swiper-item v-for="(item, index) in banners " :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</div>

</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  mounted(){
    console.log(this.banners)
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer()
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer()
        
      }
    }
  }
}
// import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";
// import {Swiper, SwiperItem} from "components/common/swiper";

// export default {
//   name: 'homeSwiper',
//   components: {
//     Swiper,
//     SwiperItem,
//   },
//   props: {
//     msg: String
//   }, 
//   data() {
//     return {
//       banner: [],
//     }
//   },
//   mounted: function() {
//     this.getData();
//   },
//   methods: {
//     getData() {
//       getHomeMultidata().then(res => {
       
//         this.banner = res.data[BANNER].list;
//       })

//     }
//   }
  
  
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
