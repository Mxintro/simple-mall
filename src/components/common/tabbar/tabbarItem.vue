<template>
<div class="tb-item" @click="itemClick">
    <div class="item-img" v-show="!isActive"><slot name="icon"></slot> </div>
    <div class="item-active-img" v-show="isActive"><slot name="icon-active"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>
</div>
  
</template>

<script>
export default {
    name: "tabbarItem",
    props: {
        link: {
            type: String,
            required: true,
        }
    },
    methods: {
			itemClick() {
				this.$router.replace(this.link)
      }
    },
    computed: {
        isActive(){
            return this.$route.path.indexOf(this.link) !== -1;
        },
        activeStyle() {
            return this.isActive ? {'color': 'red'} : {}
        }
    }
}
</script>

<style>
.tb-item {
    flex: 1;
}
.item-img img, .item-active-img img{
    width: 24px;
    height: 24px;
    margin-top: 5px;
    
    vertical-align: middle;

}
.item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
}

</style>