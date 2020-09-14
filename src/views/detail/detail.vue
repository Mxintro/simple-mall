<template>
  <div id="detail">
    <detail-nav-bar @itemClick="scrollTo" ref="navBar"> </detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :data="[topImage, goods, shop, detailInfo, paramInfo, commentInfo]"
            :probe-type="3"
            :pull-up-load="true">
      <div>
        <detail-swiper :images="topImage"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imgLoading="goodsLoad" ref="goodsInfo"></detail-goods-info>
        <detail-param-info :param="paramInfo" ref="paramInfo"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
        <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
      </div>     
    </scroll>

    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    <detail-bottom-bar></detail-bottom-bar>      
  </div>

  
</template>

<script>
import DetailNavBar from './detailcomps/DetailNavBar'
import DetailSwiper from './detailcomps/DetailSwiper'
import DetailBottomBar from './detailcomps/DetailBottomBar'
import DetailBaseInfo from './detailcomps/DetailBaseInfo'
import DetailShopInfo from './detailcomps/DetailShopInfo'
import DetailGoodsInfo from './detailcomps/DetailGoodsInfo'
import DetailParamInfo from './detailcomps/DetailParamInfo'
import DetailCommentInfo from './detailcomps/DetailCommentInfo'
import detailRecommendInfo from './detailcomps/detailRecommendInfo'

import Scroll from 'common/scroll/Scroll'
import BackTop from 'content/backTop/BackTop'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {BACKTOP_DISTANCE} from "@/common/const";


export default {

  name: "Detail",
  data: () => {
    return {
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      themTops:[],
      recommendList: [],
      showBackTop: false,
    }
  },

  components: {
    DetailNavBar,
    DetailBottomBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    detailRecommendInfo,
    BackTop,
  },
  created(){
    this._getDetailData()
    this._getRecommend()
  },
  updated(){
    // window.onload = function {
    //   this.$refs.scroll.refresh();
    // }
    this._getOffsetTops()
    setTimeout(() => this.$refs.scroll.refresh(), 20)
    // this.$nextTick(()=> console.log(document.querySelector('.content').children[0].offsetHeight))
    
  },
  methods: {
    _getDetailData() {
      const iid = this.$route.query.iid

      getDetail(iid).then((res, error) => {
        if (error) return
        const data = res.result
        
        this.topImage = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.list){
          this.commentInfo = data.rate;
        }
      })
      
    },
    goodsLoad(){
      this.$refs.scroll.refresh()
      // this._getOffsetTops()
      // console.log(this.themTops[1],this.themTops[3])
    },
    _getOffsetTops(){
      let temTops = this.themTops = []
      temTops.push(this.$refs.goodsInfo.$el.offsetTop)
      temTops.push(this.$refs.paramInfo.$el.offsetTop)
      temTops.push(this.$refs.comment.$el.offsetTop)
      temTops.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themTops)

    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    scrollTo(index){
      this._getOffsetTops()
      this.$refs.scroll.scrollTo(0, -this.themTops[index], 100)
    },
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    contentScroll(position) {
		    // 1.监听backTop的显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE
        this._listenScrollTheme(position)
        // 2.监听滚动到哪一个主题
        // this._listenScrollTheme(-position.y)
    },
    _listenScrollTheme(position){
      if (position.y > -this.themTops[1]) {
        this.$refs.navBar.currrentIndex = 0
      }else if(position.y > -this.themTops[2]) {
        this.$refs.navBar.currrentIndex = 1
      }else if (position.y > -this.themTops[3]) {
        this.$refs.navBar.currrentIndex = 2
      }else {
        this.$refs.navBar.currrentIndex = 3
      }
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;

  z-index: 9;
  background-color: #fff;
}
.content {
  position: fixed;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}

</style>