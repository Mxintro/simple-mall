<template>
	<div class="tab-control">
        <div class="tab-control-item"
        :class="{active: currentIndex===index}"
        @click="itemClick(index)"
        v-for="(item, index) in titles" :key="index">
        <span>{{item}}</span>
        </div>    
    </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
	name: "TabControl",
	props: {
		titles: {
			type: Array,
			default: [],
    },
    conectIndex: {
      type: Number,
      default: 0
    }       
  },
  data(){
    return {
      currentIndex: 0
    }
  },
    // computed: mapState({
    //     currentIndex: state => state.tabControlIndex//映射简化,vuex方法解决公用currentIndex问题
    // }),      
  methods: {
      itemClick(index) {
          // this.$store.commit('TabControlIndex', index)
          this.currentIndex = index
          this.$emit('itemClick', index)
      }
  },
  watch:{
    conectIndex(){
      this.currentIndex = this.conectIndex
    }
  }
};
</script>

<style>
.tab-control {
    display: flex;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
    font-size: 15px;
      
}

.tab-control-item {
    flex: 1;    
}

.tab-control-item span {
    padding: 5px;
}

.active {
color: var(--color-high-text);
}

.active span {
border-bottom: 2px solid var(--color-high-text);
}
</style>