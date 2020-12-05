<template>
<div>
  <nav-bar class="nav-bar">
    <img slot="left" @click="backClick" src="~assets/img/common/back.svg" alt="">
    <div slot="center">用户登录</div></nav-bar>
  <div class="user_form">
    <div class="top_info">用户登录</div>
    <div class="form_info">
      <form>
        <input type="text" :placeholder="phoneHolder" v-model="userForm.phone" ref="phone">
        <input type="password" :placeholder="pwdHolder" v-model="userForm.password" ref="pwd">
        <input class="submit" :class="{active: isSubmit}" type="submit" value="提交" @click.prevent="onSubmit"/>
      </form>
      <div class="reg-bt" @click="$router.replace('/reg')">注册新用户</div>
    </div>
  </div>
  <toast-com :toastShow.sync="toastVisible">
    <div :class="['iconfont', isSuccess ? 'icon-chenggong' : 'icon-shibai']">
      {{logMessage}}
    </div>
    </toast-com>
</div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import ToastCom from 'common/toast/ToastCom'
import { throttle } from '@/common/utils'
import { loginUser } from 'network/user'

export default {
  name: 'Login',
  data(){
    return { 
      userForm: {
        phone: '13324520965',
        password: '123456'
      },
      phoneHolder: '请输入手机号码',
      pwdHolder: '请输入密码',
      isSubmit: false,
      toastVisible: false,
      logMessage: '',
      isSuccess: false,
    }
  },
  components:{
    NavBar,
    ToastCom
  },
  methods: {
    onSubmit(){
      this.isSubmit = true
      this.formSubmit()       
    },
    formSubmit: throttle(function(){
      this.isSubmit = false
      if(!this.phoneValidate(this.userForm.phone)){
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
      loginUser(this.userForm).then(res => {
        console.log(res);
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('userName', res.data.name)
        window.sessionStorage.setItem('uid', res.data.id)

        this.isSuccess = true
        this.logMessage = '登录成功'
        this.toastVisible = true
        this.userForm.phone = ''
        this.userForm.password = ''
        setTimeout(() => this.$router.back(), 400)
      }).catch(err => {
        this.isSuccess = false
        this.logMessage = err
        this.toastVisible = true
      })
    }, 800),
    backClick(){
      this.$router.back()
    },
    phoneValidate(phones){
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
  padding: 0 40px;
}
.form_info input {
  outline:none;
  margin-bottom: 15px;
  padding-left: 20px;
  width: 100%;
  height: 3rem;
  font-size: 18px;
  background-color: #ffffff;
  border: 1px var(--color-tint) solid;
  border-radius: 6px;
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
.icon-chenggong, .icon-shibai {
  font-size: 16px;
}
 .form_info .reg-bt{
    float: right; 
    color: var(--color-tint);
  }
</style>
