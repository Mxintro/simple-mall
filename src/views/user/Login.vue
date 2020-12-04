<template>
<div>
  <nav-bar class="nav-bar"><div slot="center">用户登录</div></nav-bar>
  <div class="user_form">
    <div class="top_info">用户登录</div>
    <div class="form_info">
      <form>
        <input type="text" :placeholder="phoneHolder" v-model="userForm.phone" ref="phone">
        <input type="password" :placeholder="pwdHolder" v-model="userForm.password" ref="pwd">
        <input class="submit" :class="{active: isSubmit}" type="submit" value="提交" @click="onSubmit"/>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { throttle } from '@/common/utils'

export default {
  name: 'Login',
  data(){
    return { 
      userForm: {
        phone: '',
        password: ''
      },
      phoneHolder: '请输入手机号码',
      pwdHolder: '请输入密码',
      isSubmit: false
    }
  },
  components:{
    NavBar
  },
  methods: {
    onSubmit(){
      this.isSubmit = true
      this.formSubmit()       
    },
    formSubmit: throttle(function(){
      this.isSubmit = false
      if(!this.phoneFun(this.userForm.phone)){
        const phone = this.$refs.phone
        this.userForm.phone = ''
        this.phoneHolder = '请输入正确手机号码'
        return
      }
      if(this.userForm.password.length<6){
        const pwd = this.$refs.pwd
        this.userForm.password = ''
        this.pwdHolder = '密码不能小于6位'
        return
      }
    }, 800),
    
    phoneFun(phones){
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(phones)) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  position: fixed !important;
  top: 0;
  width: 100%;
  z-index: 10;
}
.user_form {
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.top_info {
  margin: 20px auto;
  color: var(--color-tint);
  font-size: 20px;
  font-weight: 500;
}
.form_info {
  width: 100%;
  padding: 0 20px;
}
.form_info input {
  outline:none;
  margin-bottom: 15px;
  padding-left: 20px;
  width: 100%;
  height: 2.8rem;
  font-size: 18px;
  border: 1px var(--color-tint) solid;
  border-radius: 4px;
}
.form_info .submit {
  background-color: var(--color-tint);
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
}
.active {
  opacity: 0.4;
}
</style>
