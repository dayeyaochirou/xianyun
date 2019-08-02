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
      <el-form-item label="出发城市" >
        <el-autocomplete
          v-model="form.start"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          style="width: 100%;"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-input v-model="form.end"></el-input>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
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
      form: {
        start: "",
        end: "",
        date: ""
      }
    };
  },
  methods: {
    // 选择搜索框选项值的时候触发
    handleSelect(value,cb){

    },
    //修改时间格式
    datechange(value) {
      this.form.date = moment(value).format("YYYY-MM-DD");
    },
    //切换单程返程样式
    handleChangeTab(index) {
      this.currentTab = index;
    },
    //提交表单
    onSubmit() {}
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
