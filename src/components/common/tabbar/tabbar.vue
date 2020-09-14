<template>
<div class="tabber">
    <slot></slot>
</div>
  
</template>

<script>
export default {
    name: 'tabbar',

}
</script>

<style>
.tabber {
     /* 本身的样式 */
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);

    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;


    display: flex;
    /* justify-content:  space-around; */
    
    text-align: center;
}

</style>