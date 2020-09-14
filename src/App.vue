<template>
  <div id="app">
    <keep-alive exclude="Detail">
     <router-view/>    
    </keep-alive>
    <tabbermain/>
  </div>
</template>

<script>

import tabbermain from 'components/content/mainTabbar/TabbarMain.vue'

export default {
  name: "app",
  components: {
    tabbermain,
  }
}
</script>

<style>
@import "assets/css/base.css";

#app {
    position: relative;
}

</style>
