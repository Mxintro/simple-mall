<template>
<div class="toast" v-if="toastShow">
  <div class="toast-inner">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'ToastCom',
 
  props: {
    toastShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toast() {
      setTimeout(() =>{
        this.$emit("update:toastShow",false)
      }, 1000)
    }
  },
  watch: {
    toastShow(val) {
      if(val) this.toast()
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  z-index: 2000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast-inner {
  text-align: center;
  border-radius: 5px;
  color:#FFF;
  background: var(--color-tint);
  opacity: 0.5;
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  max-width: 300px;
}
</style>
