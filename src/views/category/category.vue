<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <category-menu :categoryList="categoryList" @selectItem="menuClick"></category-menu>
    <scroll class="scroll-content"
            :data="[categoryData]"
            ref="categoryScroll">
      <div>
        <category-content-tab :categoryContent="categoryContent"></category-content-tab>
        <tab-control :titles="detailTitle" @itemClick= "tabClick" :key = "selectItemIndex"></tab-control>
        <category-detail-tab :categoryDetail="categoryDetail"></category-detail-tab>
      </div>    
    </scroll>
    
  </div>
</template>

<script>
import CategoryMenu from './childcomps/CategoryMenu'
import CategoryContentTab from './childcomps/CategoryContentTab'

import CategoryDetailTab from './childcomps/CategoryDetailTab'

import Scroll from 'common/scroll/Scroll'
import NavBar from 'common/navbar/NavBar'
import TabControl from 'content/tabControl/TabControl'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {TabControlMixin} from '@/common/mixin'
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
  },
  mixins: [TabControlMixin],
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
    this.$refs.categoryScroll.refresh()
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
  }

}
</script>

<style scoped>
  .nav-bar {
    background:  rgb(255, 129, 152);
    color: #ffffff;
    font-size: 16px;
  }
  #category {
    height: 100vh;
    /* position: relative; */
  }
  .scroll-content {
    position: absolute;
    left: 100px;
    right: 0px;
    top: 44px;
    bottom: 49px;
  }
</style>