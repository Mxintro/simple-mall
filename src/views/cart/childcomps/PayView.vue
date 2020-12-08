<template>
<div v-if="payViewShow">
  <div class="cover"></div>
  <div class="pay_view">
    <div class="pay_view_inner">
    <div class="pay_info">收货地址：</div>
    <div class="pay_info">支付方式：</div>
    <div class="pay_info cost">共：<span>￥{{orderAmount}}</span></div>
    <div class="pay_check">
      <div class="pay_cancel" @click="toastClose">取消</div>
      <div class="pay_confirm" @click="orderConfirm">确认</div>
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
    },
    orderAmount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    payView() {
      setTimeout(() =>{
        this.$emit("update:payViewShow",false)
      }, 1500)
    },
    orderConfirm() {
      this.$emit('orderConfirm')
    },
    toastClose() {
      this.$emit('update:payViewShow',false)
    }
  }
}
</script>

<style scoped>
.cover {
  position: fixed;
  z-index: 9;
  top: 0; 
  bottom: 0;
  left: 0;
  right: 0;
  background-color:#000;
  opacity: 0.2;
}
.pay_view{
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pay_view_inner {
  text-align: center;
  border-radius: 10px;
  background-color:#FFF;
  height: 35vh;
  width: 300px;

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
  border-bottom: #cccccc 0.5px solid;
}
.pay_view_inner .cost {
  border-bottom: none;
}
.pay_view_inner .cost span {
  font-size: 26px;
  color: rgb(255, 69, 0);
}
.pay_check {
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: space-around;
}
.pay_check div {
  flex-grow: 0;
  border-radius: 6px;
  height: 6vh;
  line-height: 6vh;
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
