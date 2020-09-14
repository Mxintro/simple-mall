<template>
<div class="comment-item"  v-if="Object.keys(comment).length !==0">
  <div class="user">
    <img :src="comment.user.avatar" alt="">
    <span>{{comment.user.uname}}</span>
  </div>
  <div class="content">{{comment.content}}</div>
  <div class="detail">
    <span class="date">{{comment.created | showDate}}</span>
    <span>{{comment.style}}</span>
  </div>
</div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "Comment",
  props: {
    comment:{
      type: Object,
      default: {}
    }
  },
  filters: {
    showDate(value){
      let date = new Date(value*1000)//参数要求毫秒，时间戳一般为秒，所以*1000
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped>
.user {
  padding: 10px 0 5px;
}
.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  vertical-align: -14px;
}
.user span {
  margin-left: 15px;
}
.content {
  padding: 10px 0;
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.detail {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.detail .date {
  margin-right: 8px;
}

</style>