<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">xxx商城</div></nav-bar>
    <user-info :userInfo="userInfo" @log-out="getUserInfo" />

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import UserInfo from './childComps/UserInfo'
import ListView from './childComps/ListView'
import NavBar from 'common/navbar/NavBar'

export default {
  name: "Profile",
  components: {
    UserInfo, ListView, NavBar
  },
  data() {
    return {
      orderList: [
        {icon: '#order', iconColor: '#ff8198', info: '我的消息',link: ''},
        {icon: '#point', iconColor: '#fc7b53', info: '我的订单',link: '/order'},
        {icon: '#vip', iconColor: '#ffc636', info: '会员卡',link: ''},
      ],
      serviceList: [
        {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
        {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
      ],
      userInfo: {
        userName: '',
        uid: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  activated(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.userInfo.userName = window.sessionStorage.getItem('userName') || '登录/注册'
      this.userInfo.uid = window.sessionStorage.getItem('uid')
    }
  }
}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
 

</style>
