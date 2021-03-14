<template>
  <div id="user-info">
    <div class="clear-fix">
      <div class="user_image">
        <img src="https://api.prodless.com/avatar.png" alt="">
      </div>
      <div class="login-info">
        <slot name="user-nickname">
          <div @click.stop="userHandler">{{userInfo.userName}}</div>
        </slot>
      </div>
    </div>
    <dialog-view
      :dialogVisible.sync="handleVisible">
      <div class="handle_button">
        <div class="user_switch" @click="userSwitch">切换用户</div>
        <div class="user_logout" @click="userLogout">退出登录</div>
      </div>
    </dialog-view>
  </div>
</template>

<script>
import DialogView from 'common/dialog/DialogView'

export default { 
  name: "UserInfo",
  data(){
    return {
      handleVisible: false
    }
  },
  props: {
    userInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  components: {
    DialogView
  },
  methods: {
    userHandler(){
      // ?在a标签中,跳转会出问题
      const token = window.sessionStorage.getItem('token_user')
      const uid = window.sessionStorage.getItem('uid')
      console.log(token);
      if(token) {
        this.handleVisible = true
        return
      }
      this.$router.push({name: 'Login'})
    },
    userSwitch() {
      this.handleVisible = false
      this.$store.commit('cartListClear')
      this.$router.push({name: 'Login'})
    },
    userLogout() {
      this.handleVisible = false
      this.$store.commit('cartListClear')
      window.sessionStorage.clear()
      this.$emit('log-out')
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
.handle_button {
  display: flex;
  height: 7rem;
  align-items: center;
  width: 300px;
  justify-content: space-around;
}
.handle_button div {
  flex-grow: 0;
  border-radius: 6px;
  height: 3rem;
  line-height: 3rem;
  width: 110px;
  font-size: 18px;
}
.handle_button .user_switch {
  background-color: #a0b0d7;
}
.handle_button .user_logout {
  background-color: var(--color-high-text);
  color: #FFF;
}
</style>
