<template>
<nav-bar class="detail-nav">
    <img slot="left" @click="backClick" src="~assets/img/common/back.svg" alt="">
    <div slot='center' class="title">
        <span class="title-item" @click="itemClick(index)" :class="{active: currrentIndex===index}"
        v-for="(item, index) in titleInfos" :key="index">{{item}}</span>
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
    data(){
      return {
        currrentIndex: 0
      }
    },
    props: {
        titleInfos: {
            type: Array,
            default: () => {
            return ['商品', '参数', '评论','推荐']
            }
        }
        
    },
    methods: {
        backClick(){
          this.$router.back()
        },
        itemClick(index){
          this.currrentIndex = index
          this.$emit("itemClick", index)
          console.log(`%%%%%%%%%%%%%%%${index}`)
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
.title-item .active {
  color: var(--color-high-text);
}
</style>