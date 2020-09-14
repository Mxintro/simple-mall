<template>
  <div class="param" v-if="Object.keys(param).length !== 0">
    <table class="info-size">
      <tr v-for="(tr, trIndex) in param.sizes[0]" :key="trIndex">
        <td v-for="(td, tdIndex) in tr" :key="tdIndex">{{td}}</td>
      </tr>
    </table>
    <table>
      <tr v-for="(info, index) in param.infos" :key="index">
        <td class="key">{{info.key}}</td>
        <td>{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="param.image.length !== 0">
      <img :src="param.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    param: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
  .param {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8; 
  }

  .param table {
    width: 100%;
    border-collapse: collapse;
  }
  .param table tr {
    height: 42px;
  }

  .param table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-img img {
    width: 100%;
  }
  table .key {
    width: 95px;
  }
</style>