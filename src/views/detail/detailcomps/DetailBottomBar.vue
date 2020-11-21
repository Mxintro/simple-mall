<template>
<div class="bottom-bar">
    <div class="bar-item">
        <div class="icon service"></div>
        <span class="text">客服</span>
    </div>
    <div class="bar-item">
        <div class="icon shop"></div>
        <span class="text">店铺</span>
    </div> 
    <div class="bar-item">
        <div class="icon select"></div>
        <span class="text">收藏</span>
    </div>
    <div class="bar-item shopping-cart" @click="$emit('add-click')">加入购物车</div> 
    <div class="bar-item purchase" @click="$emit('buy-click')">购买</div>     
</div>
  
</template>
<script>
export default {
    name: "DetailBottomBar"
}
</script>

<style scoped>
.bottom-bar {
    position: fixed;
    height: 58px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    display: flex;
}

.bar-item {
    flex: 1;
    text-align: center;
}
.text {
    font-size: 13px;

  }
.shopping-cart, .purchase {
    flex-grow: 1.5;
    
    line-height: 58px ;
    text-align: center;   
}

.icon {
    margin: 10px auto 3px;
    height: 22px;
    width: 22px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.service {
    background-position:0 -54px;
}

.shop {
    background-position:0 -98px;
}

.shopping-cart {
    background-color: #ffe817;
    color: #333;
}
.purchase {
    background-color: #f69;
}
</style>