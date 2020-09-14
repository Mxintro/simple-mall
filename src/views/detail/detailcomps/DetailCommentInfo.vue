<template>
  <div class="comment" v-if="Object.keys(commentInfo).length !==0">
    <div class="comment-top">
      <span class="title">用户评价({{commentInfo.cRate}})</span>
      <span class="more">更多<i class="arrow-right"></i></span>
    </div>
    <comment :comment="commentInfo.list[0]"></comment>
  </div>
</template>

<script>
import Comment from 'content/comment/Comment'


export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default:{}
    }
  },
  components: {
    Comment,
  }
}
</script>

<style scoped>
  .comment {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .comment-top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .comment-top .title {
    float: left;
    font-size: 15px;
  }
  .comment-top .more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
</style>