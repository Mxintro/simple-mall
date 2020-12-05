<template>
  <div id="user-info">
    <div class="clear-fix">
      <div class="user_image">
        <img src="https://api.prodless.com/avatar.png" alt="">
      </div>
      <div class="login-info">
        <slot name="user-nickname">
          <div @click.stop="userLogin">{{userInfo.userName}}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "UserInfo",
    props: {
      userInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      userLogin(){
        // ?在a标签中,跳转会出问题
        this.$router.push({name: 'Login'})
      }
    }
	}
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}
.clear-fix {
  display: flex;
  align-items: center;
}
.user_image{
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
}

.user_image img {
  width:100%;
}
.login-info {
  margin-left: 10px;
  color: #fff;
}

</style>
