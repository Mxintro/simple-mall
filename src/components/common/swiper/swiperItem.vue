<template>
  <div class="swiperItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "swiperItem",

}
</script>

<style>
.swiperItem {
  width: 100%;
  flex-shrink: 0;
}

.swiperItem img {
  width: 100%;
}
</style>