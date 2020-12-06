<template>
<div v-if="payViewShow">
  <div class="cover"></div>
  <div class="pay_view">
    <div class="pay_view_inner">
    <div class="pay_info">收货地址</div>
    <div class="pay_info">支付方式</div>
    <div class="pay_info">共</div>
    <div class="pay_check">
      <div class="pay_cancel">取消</div>
      <div class="pay_confirm">确认</div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PayView',
 
  props: {
    payViewShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    payView() {
      setTimeout(() =>{
        this.$emit("update:payViewShow",false)
      }, 1500)
    }
  },
  watch: {
    payViewShow(val) {
      if(val) this.payView()
    }
  }
}
</script>

<style scoped>
.cover {
  position: fixed;
  z-index: 2000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:#000;
  opacity: 0.2;
}
.pay_view{
  position: fixed;
  z-index: 2001;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pay_view_inner {
  z-index: 2001;
  text-align: center;
  border-radius: 10px;
  background-color:#FFF;
  height: 35vh;
  width: 300px;
  border: var(--color-text) 1px solid;
  opacity:1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pay_view_inner .pay_info{
  flex: 1;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: #fff 0.5px solid;
}
.pay_check {
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: space-around;
}
.pay_check div {
  flex-grow: 0;
  border-radius: 4px;
  height: 8vh;
  line-height: 8vh;
  width: 120px;
  font-size: 16px;
}
.pay_cancel {
  background-color: var(--color-tint);
  opacity: 0.5;
}
.pay_confirm {
  background-color: var(--color-high-text);
  color: #FFF;
}
</style>
