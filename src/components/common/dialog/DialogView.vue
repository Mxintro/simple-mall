<template>
<div v-if="dialogVisible">
  <div class="cover" @click="$emit('update:dialogVisible',false)"></div>
  <div class="inner">
    <slot></slot>
    <!-- <div class="dialog_content">
      <slot></slot>
    </div> -->
  </div>
</div>
</template>

<script>
export default {
  name: 'DialogView',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.cover {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:#000;
  opacity: 0.2;
}
.inner{
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  border-radius: 10px;
  background-color:#FFF;
}

</style>
