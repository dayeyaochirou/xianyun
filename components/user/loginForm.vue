<template>
  <el-form ref="form" :model="userform" class="formbody" :rules="rules" >
    <el-form-item prop="username">
      <el-input v-model="userform.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="userform.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-link type="primary" :underline="false" class="fr" to="#">忘记密码?</el-link>
    <el-form-item>
      <el-button type="primary" @click="loginSubmit" class="kuan">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      userform: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    loginSubmit() {
      // 使用$refs的属性验证表单,判断值是否为true
      this.$refs['form'].validate(valid=>{
        if(valid){
          this.$axios({
            url:'/accounts/login',
            method:'post',
            data:this.userform
          }).then(res=>{
            console.log(res.data)
            // 使用store.commit方法时传入两个参数,第一个参数是传值的位置在哪个js文件下的哪个方法名
            // 第二个参数是传入的值
            this.$store.commit('user/setUserinfo',res.data)
            this.$router.push('/')
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.formbody {
  padding: 25px;
  .kuan {
    width: 100%;
  }
}
</style>

