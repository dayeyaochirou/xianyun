<template>
  <div class="login">
    <div class="from">
      <el-row type="flex" justify="center" class="tabs">
        <div
          v-for="(item, index) in haderList"
          :key="index"
          :class="{active: currentTab === index}"
          @click="handleChangeTab(index)"
        >{{item}}</div>
      </el-row>
      <!-- 登录小表单 -->
      <!-- 传值的方式这次未能实现,因为比较麻烦,光是父传子还不行,还需要子传父 -->
     <!-- <loginForm :currentTab='currentTab'/> -->
     <loginForm v-show="currentTab==0"/>
      <!-- 注册小表单 -->
     <!-- <RegisterForm :currentTab='currentTab'/> -->
     <RegisterForm v-show="currentTab==1"/>
    </div>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/RegisterForm'
export default {
  data() {
    return {
      haderList: ["登录", "注册"],
      currentTab: 0,

    };
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  },
  components:{
    loginForm,
    RegisterForm
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 600px;
  min-width: 1000px;
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) 600px 0;
  background-size: 85%;
  .from {
    z-index: 9;
    width: 500px;
    position: absolute;
    left: 25%;
    top: 25%;
    border-top: 1px transparent solid;
    background-color: #f3f2ee;
    .tabs {
      div {
        display: inline-block;
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        border-top: 2px #eee solid;
        line-height: 48px;
        text-align: center;
        color: #666;
        &.active {
          border-top: 2px solid #579df8;
          color: #579df8;
          background-color: #f3f2ee;
        }
      }
    }
  }
}
</style>
