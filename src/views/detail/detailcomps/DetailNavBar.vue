<template>
<nav-bar class="detail-nav">
    <img slot="left" @click="backClick" src="~assets/img/common/back.svg" alt="">
    <div slot='center' class="title">
        <span class="title-item" 
          v-for="(item, index) in titleInfos" 
          @click="itemClick(index)"
          :class="{'active': currentIndex===index}"
          :key="index">{{item}}</span>
    </div>
</nav-bar>
  
</template>

<script>
import NavBar from 'common/navbar/NavBar'

export default {
    name: "DetailNavBar",

    components: {
        NavBar,
    },
    props: {
        titleInfos: {
          type: Array,
          default: () => {
          return ['商品', '参数', '评论','推荐']
          }
        },
        currentIndex: {
          type: Number,
          default: 0
        }
        
    },
    methods: {
        backClick(){
          this.$router.back()
        },
        itemClick(index){
          this.$emit("itemClick", index)
        }
    }
}
</script>

<style>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}
.title {
    display: flex;
}
.title-item {
    flex: 1;
    font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
</style>