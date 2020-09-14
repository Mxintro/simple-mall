<template>
  <div class="feature">
    <div class="items" v-for="(item, index) in features" :key="index">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>

  </div>

</template>

<script>
export default {
    name: "FeatureView",
    props: {
        features:{
            type: Array,
            default:[]
        }
    }
}
</script>

<style>
.feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
}

.items {
    flex: 1;
    text-align: center;
}

.items img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
}
</style>