d<template>
  <div id="detail">
    <detail-nav-bar @itemClick="scrollTo" :currentIndex="navBarIndex"> </detail-nav-bar>
    <scroll 
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :data="[topImage, goods, shop, detailInfo, paramInfo, commentInfo]"
      :probe-type="3"
      :pull-up-load="true">
      <div>
        <detail-swiper ref="top" :images="topImage"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" ref="ginfo"></detail-goods-info>
        <detail-param-info :param="paramInfo" ref="paramInfo"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
        <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
      </div>     
    </scroll>

    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    <detail-show-sku
      :isVisible.sync="skuVisible"
      :goodTitle="goods.title"
      :goodIid="detailIid"
      :entryType.sync="isBuying"
      :skuInfos="skuInfo"></detail-show-sku> 
    <detail-bottom-bar
      @add-click="skuVisible=true"
      @buy-click="buyingClick"></detail-bottom-bar>
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
import DetailShowSku from './detailcomps/DetailShowSku'


import Scroll from 'common/scroll/Scroll'
import BackTop from 'content/backTop/BackTop'

import { getDetail, getRecommend, Goods, Shop, GoodsParam, Sku } from "network/detail";
import { BACKTOP_DISTANCE } from "@/common/const";
import { backTopMixin } from "@/common/mixin"

export default {

  name: "Detail",
  data: () => {
    return {
      detailIid: '',
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      themTops:[],
      recommendList: [],
      navBarIndex: 0,
      skuInfo: {},
      skuVisible: false,
      isBuying: false
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
    DetailShowSku
  },
  mixins: [backTopMixin],
  created(){
    this._getDetailData()
    this._getRecommend()
  },
  methods: {
    _getDetailData() {
      this.detailIid = this.$route.query.iid

      getDetail(this.detailIid).then((res, error) => {
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
        this.skuInfo = new Sku(data.skuInfo)
      })
      
    },
    goodsLoad(){
      console.log('********************************goodsload');
      this.$refs.scroll.refresh()

    },
    _getOffsetTops(){
      let temTops = this.themTops = []
      temTops.push(0)
      temTops.push(this.$refs.paramInfo.$el.offsetTop)
      temTops.push(this.$refs.comment.$el.offsetTop)
      temTops.push(this.$refs.recommend.$el.offsetTop)
    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    scrollTo(index){
      this.navBarIndex = index
      this._getOffsetTops()
      this.$refs.scroll.scrollTo(0, -this.themTops[index], 100)
    },
    
    contentScroll(position) {
        this.showBackTop = position.y < -BACKTOP_DISTANCE
        this._listenScrollTheme(position)
    },
    _listenScrollTheme(position){
      if (position.y > -this.themTops[1]) {
        this.navBarIndex = 0
      }else if(position.y > -this.themTops[2]) {
        this.navBarIndex = 1
      }else if (position.y > -this.themTops[3]) {
        this.navBarIndex = 2
      }else {
        this.navBarIndex = 3
      }
    },
    buyingClick() {
      this.skuVisible = true
      this.isBuying = true
    }
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