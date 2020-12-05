<template>
  <div id="app">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <keep-alive exclude="Detail,Login">
     <router-view/>    
    </keep-alive>
    <tabbar-main/>
  </div>
</template>

<script>

import TabbarMain from 'components/content/mainTabbar/TabbarMain.vue'

export default {
  name: "app",
  components: {
    TabbarMain,
  }
}
</script>

<style>
@import "assets/css/base.css";

#app {
    position: relative;
}

</style>
