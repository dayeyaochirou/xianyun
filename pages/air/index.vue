<template>
  <div class="air">
    <!-- 小标题 -->
    <h3>
      <i class="el-icon-s-promotion"></i>
      <span>国内机票</span>
    </h3>
    <!-- 搜索框和黄色的图片 -->
    <el-row type="flex" justify="space-between">
      <div class="search">
          <airForm/>
      </div>
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>
    <!-- 灰色的小横条 -->
    <el-row class="huiTiao">
      <el-col :span="8">
        <div class="grid-content">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>100%航协认证
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <i class="iconfont iconbaozheng" style="color:green;"></i>出行保证
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>7x24小时服务
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import airForm from '@/components/air/airForm'
export default {
  data() {
    return {
      // 轮播图数据
      banners: []
    };
  },
  mounted() {
    // nuxt会将axios绑定到vue原型对象中.因此可以直接使用this.$axios
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  },
  components:{
    airForm
  }
};
</script>

<style lang="less" scoped>
.air {
  width: 1000px;
  margin: 20px auto;
  h3 {
    color: orange;
    margin-bottom: 20px;
    span {
      font-weight: 400;
    }
  }
  .huiTiao {
    border: 1px solid #ccc;
    height: 58px;
    padding: 10px 0;
    margin:10px 0;
    background-color: #eee;
    div {
      height: 38px;
      border-right: 1px solid #ccc;
      line-height: 38px;
      text-align: center;
      i {
        font-size: 30px;
        vertical-align: middle;
      }
    }
    :nth-child(3){
        border-right:none;
        div{
            border-right:none;
        }
    }
  }
  .search{
    width: 360px;
    height: 349px;
    border: 1px solid #ccc;
    border-top:none;
  }
}
</style>
