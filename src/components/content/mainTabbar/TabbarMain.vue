<template>
  <tabbar>
    <tabbar-item link="/home">
      <img slot="icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="text">首页</div>
    </tabbar-item>
    <tabbar-item link="/category">
      <img slot="icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="text">分类</div>s
    </tabbar-item>
    <tabbar-item link="/cart">
      <img slot="icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
      <img slot="icon" src="~assets/img/tabbar/cart.svg" alt="" >
      <div slot="text">购物车</div>
    </tabbar-item>
    <tabbar-item link="/profile">
      <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import tabbar from "common/tabbar/tabbar.vue";
import tabbarItem from "common/tabbar/tabbarItem.vue";

export default {
  name: "tabbarmain",
  components: {
    tabbar,
    tabbarItem,
  },
};
</script>

<style>
</style>