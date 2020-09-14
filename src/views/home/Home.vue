<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
                :conectIndex = TabControlIndex
                v-show="isTabFixed" 
                @itemClick = "tabClick" 
                class="fixed"
                :titles="['流行', '新款', '精选']">
    </tab-control>
    <keep-alive>
    <scroll class="content"
            ref="scroll"
            @pulling-up="loadMore"
            @scroll="contentScroll"
            :data="goodslistShow"
            :probe-type="3"
            :pull-up-load="true">
      <div id="content-h">
        <home-swiper :banners="banners" ref="swiper"></home-swiper>
        <feature-view :features="recommends"></feature-view>
        <recommend-view/>
        <tab-control @itemClick = "tabClick" ref="tabControl" :conectIndex = TabControlIndex
                    :titles="['流行', '新款', '精选']"></tab-control>
        <good-list :goods-list = "goodslistShow"></good-list>
      </div>
    </scroll>
    </keep-alive>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    
  </div> 
</template>

<script>
// @ is an alias to /src
import NavBar from 'common/navbar/NavBar'
import Scroll from 'common/scroll/Scroll'
import TabControl from 'content/tabControl/TabControl'
import BackTop from 'content/backTop/BackTop'
import homeSwiper from './childcomps/homeSwiper'
import FeatureView from './childcomps/FeatureView'
import RecommendView from './childcomps/RecommendView'
import GoodList from './childcomps/GoodList'



import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from "network/home";
import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";


export default {
  name: 'Home',
  components: {
    NavBar,
    Scroll,
    homeSwiper,
    FeatureView,
    RecommendView,
    TabControl,
    GoodList,
    BackTop,
    
  },

  data() {
    return {
      res: [],
      banners: [],
      recommends: [],

      goodslist: {
        pop: {page: 1, list:[]},
        new: {page: 1, list:[]},
        sell: {page: 1, list:[]}
      },
      currentType: POP,
      isTabFixed: false,
      tabOffsetTop: 0,
      showBackTop: false,
      TabControlIndex: 0
    }
  },

  created() {
    this.getMultidata()
    for (let key in this.goodslist) {
      this.getHomePorducts(key)
    }   
  },
  activated(){
    this.$refs.swiper.startTimer()
  },
  deactivated() {
    this.$refs.swiper.stopTimer()
  },
  updated(){
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(`======= ${document.querySelector('.content').children[0].offsetHeight}`)

  },
  computed: {
    goodslistShow() {
      return this.goodslist[this.currentType].list
    },
  },
  methods: {
    contentScroll(position){
      this.isTabFixed = position.y < -this.tabOffsetTop
      
      this.showBackTop = position.y < -BACKTOP_DISTANCE

    }, 
    tabClick(index){
      this.currentType = Object.keys(this.goodslist)[index]
      this.TabControlIndex = index
    },
    loadMore(){
      this.getHomePorducts(this.currentType)
    },
    getMultidata() {
      getHomeMultidata().then(res => {
        this.res = res.data
        this.recommends = res.data[RECOMMEND].list
        this.banners = res.data[BANNER].list
        console.log(res.data[BANNER].list)

        this.$nextTick(() => {
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        })
      })
    },
    getHomePorducts(type) {
      getHomeData(type, this.goodslist[type].page).then(res => {
        this.goodslist[type].list.push(...res.data.list)
        this.goodslist[type].page += 1
        this.$refs.scroll.finishPullUp()

      }) 
    },
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
  
} 
</script>
  
<style scoped>
#home {
  height: 100vh;
}

.fixed {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>