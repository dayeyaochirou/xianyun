<template>
  <el-form ref="form" :model="userform" class="formbody" :rules="rules">
    <el-form-item prop="username">
      <el-input v-model="userform.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input type="captcha" v-model="userform.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input type="nickname" v-model="userform.nickname" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="userform.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input type="password" v-model="userform.checkPassword" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="kuan">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      props: ["currentTab"],
      currentTab: "currentTab",
      userform: {
        username: "",
        captcha: "",
        nickname:"",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { 
            min: 4, 
            max: 12, 
            message: '长度在 4 到 12 个字符',
            trigger: 'blur' 
          }
        ],
        checkPassword: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
      this.$axios({
        url:'captchas',
        method:'post',
        data:{
          tel:this.userform.username
        }
      })
      .then(res=>{
        // console.log(res)
        const {code}=res.data
        this.$confirm(`模拟手机验证码为：${code}`,'提示',{
           confirmButtonText: '确定',
           showCancelButton: false  
        })
      })
    },
    onSubmit() {
      const {checkPassword,...getform}=this.userform
      this.$axios({
        url:'accounts/register',
        method:'post',
        data:getform
      })
      .then(res=>{
        console.log(res.data);
        this.$store.commit('user/setUserinfo',res.data)
        this.$router.push('/')
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

