<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div id="content">
      <scroll :data="categoryList">
        <div>
          <category-menu :categoryList="categoryList" @selectItem="menuClick"></category-menu>
        </div>
      </scroll>
      <scroll class="scroll-content"
            @scroll="categoryScroll"
            :data="[categoryData]"
            :probe-type="3"
            ref="scroll"
            >
      <div>
        <category-content-tab :categoryContent="categoryContent"></category-content-tab>
        <tab-control :titles="detailTitle" @itemClick= "tabClick" :key = "selectItemIndex"></tab-control>
        <category-detail-tab :categoryDetail="categoryDetail"></category-detail-tab>
      </div>    
    </scroll>
    </div>
    
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CategoryMenu from './childcomps/CategoryMenu'
import CategoryContentTab from './childcomps/CategoryContentTab'
import CategoryDetailTab from './childcomps/CategoryDetailTab'
import Scroll from 'common/scroll/Scroll'
import TabControl from 'content/tabControl/TabControl'
import BackTop from 'content/backTop/BackTop'


import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {TabControlMixin,backTopMixin} from '@/common/mixin'
import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";



export default {
  name: 'Category',

  components: {
    Scroll,
    NavBar,
    CategoryMenu,
    CategoryContentTab,
    TabControl,
    CategoryDetailTab,
    BackTop
  },
  mixins: [TabControlMixin, backTopMixin],
  data(){
    return {
      categoryList: [],
      categoryData: {},
      selectItemIndex: -1,
      detailTitle: ['流行','新款','销量'],
    }
  },

  created(){
    this._getCategory()
  },

  updated(){
  //   this.$refs.categoryScroll.refresh()
    let screen = [window.screen.height,window.screen.width,
    document.documentElement.scrollWidth || document.body.scrollWidth,
    document.documentElement.scrollHeight || document.body.scrollHeight]   
    console.log(screen);

  },

  computed: {//返回数组项，无法跟踪数组内更新
    categoryContent(){
      if(this.selectItemIndex === -1)return []
      return this.categoryData[this.selectItemIndex].subcategories    
    },
    categoryDetail(){
      return (this.selectItemIndex !== -1) ? this.categoryData[this.selectItemIndex].categoryDetail[this.currentType] : []     
    }
  },
  methods: {
    _getCategory(){
      getCategory().then((res, error) => {
        if (error) return
        this.categoryList = res.data.category.list
        for (let i = 0; i < this.categoryList.length; i++){
          this.categoryData[i] = {
            subcategories: [],
            categoryDetail: {
              "pop": [],
              "new": [],
              "sell": []
            }
          }
        }         
        this._getCategoryContent(0)
        })
    },
    _getCategoryContent(index){
      this.selectItemIndex = index
      let maitKey = this.categoryList[index].maitKey 
      getSubcategory(maitKey).then((res, error) => {
        if(error)return
        this.categoryData[index].subcategories = res.data.list
        this.categoryData = {...this.categoryData}//监听变化
        
        this._getCategoryDetail("pop")
        this._getCategoryDetail("new")
        this._getCategoryDetail("sell")       
      })
    },
    _getCategoryDetail(type){
      let miniWallkey = this.categoryList[this.selectItemIndex].miniWallkey 
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.selectItemIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}//监听变化

      })
    },
    menuClick(index){
      this._getCategoryContent(index)
    },
    categoryScroll(positon){
      this.showBackTop = positon.y < -BACKTOP_DISTANCE
    }
  }

}
</script>

<style scoped>
  #category {
    height: 100vh;
    /* position: relative; */
  }
  .nav-bar {
    background:  rgb(255, 129, 152);
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
  }

  #content {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
 .scroll-content{
   flex: 1;
   height: 100%;
 }

  .back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>