<template>
  <div>
    <el-row type="flex" justify="center" class="tabs">
      <div
        v-for="(item, index) in haderList"
        :key="index"
        :class="{active: currentTab === index}"
        @click="handleChangeTab(index)"
      >{{item}}</div>
    </el-row>

    <el-form ref="form" :model="form" label-width="80px" class="frombody">
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleDepartSelect"
          style="width: 100%;"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleDestSelect"
          style="width: 100%;"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.departDate"
          style="width: 100%;"
          @change="datechange"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 100%;">
          <i class="el-icon-search"></i> 搜索
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      haderList: ["单程", "往返"],
      currentTab: 0,
      autocomplete: [],
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // 点击搜索框时候触发
    querySearch(queryString, cb) {
      // 判断关键字如果为空,就不用发送请求,而是回调函数返回一个空数组
      if (!queryString) {
        return cb([]);
      }
      this.$axios({
        url: "http://157.122.54.189:9095/airs/city",
        params: {
          name: queryString
        }
      }).then(res => {
        const { data } = res.data;
        const arr = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        // //  设置第一个为选中的默认值
        this.form.destCity = arr[0].value;
        this.form.destCode = arr[0].sort;
        cb(arr);
      });
    },
    // 点击出发地点选中建议项时触发
    handleDepartSelect(value) {
      this.form.departCity = value.value;
      this.form.departCode = value.sort;
    },
    // 点击到达地点选中建议项时触发
    handleDestSelect(value) {
      this.form.destCity = value.value;
      this.form.destCode = value.sort;
    },
    //修改时间格式
    datechange(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    //切换单程返程样式
    handleChangeTab(index) {
      this.currentTab = index;
    },
    //提交表单
    onSubmit() {
      this.$router.push({
        path: "/air/fights",
        query: this.form
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  width: 100%;
  margin-bottom: 8px;
  div {
    display: inline-block;
    width: 50%;
    height: 50px;
    box-sizing: border-box;
    border-top: 2px #eee solid;
    line-height: 48px;
    text-align: center;
    background-color: #f3f2ee;
    &.active {
      border-top: 2px solid orange;
      color: orange;
      background-color: #fff;
    }
  }
}
.frombody {
  padding: 12px;
}
</style>
