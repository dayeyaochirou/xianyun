<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <!-- 为了执行computed代码而特意加入一个隐藏的内容 -->
      <input type="hidden" :value="priceAndUse" />
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="guarantee(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收机票信息
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      captcha: "",
      users: [
        {
          username: "",
          id: ""
        }
      ],
      contactName: "",
      contactPhone: "",
      insurances: [], //保险id
      invoice: false //是否开发票=
    };
  },
  methods: {
    // 勾选保险
    guarantee(id) {
      if (this.insurances.indexOf(id) == -1) {
        this.insurances.push(id);
      } else {
        this.insurances.splice(this.insurances.indexOf(id), 1);
      }
    },
    // 添加乘机人
    handleAddUsers() {
      // console.log(this.data)
      this.users = [
        ...this.users,
        {
          username: "",
          id: ""
        }
      ];
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        url: "http://157.122.54.189:9095/captchas",
        method: "post",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        // console.log(res)
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false
        });
      });
    },
    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      // for (const key in data) {
      //   if(!data[key////invoice]){
      //     this.$confirm(`请完善提交信息`, "提示", {
      //     confirmButtonText: "确定",
      //     showCancelButton: false
      //   })
      //   return
      //   }
      // }
      this.$axios({
        url: "http://157.122.54.189:9095/airorders",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res);
        this.$message({
          message: "提交成功，正在跳转支付页面",
          type: "success"
        });
        const id=res.data.data.id
        // console.log(id)
      //  跳转支付页面
        this.$router.push({
          path:"/air/pay",
          query:{
            id
          }
        })
      }).catch(err => {
        const {message} = err.response.data;
        // 警告提示
        this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
    })
    }
  },
  computed: {
    priceAndUse() {
      var price = 0;
      var insurancesPrice = 0;
      var use = this.users.length;
      insurancesPrice = this.insurances.length * 30;
      price =
        (this.data.seat_infos.settle_price +
          insurancesPrice +
          this.data.airport_tax_audlet) *
        use;
      var priceAndUse = {
        price,
        use
      };
      // console.log(priceAndUse)
      // 把价格和人数发给它爸爸
      this.$emit("setTotalPrice", priceAndUse);
      return priceAndUse;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>