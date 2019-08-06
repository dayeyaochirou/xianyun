<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in setairList" :key="index" :airData="item" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
       <flightsAside/>
      </div>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 10, 16]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";
import flightsAside from "@/components/air/flightsAside"
import moment from "moment";

export default {
  watch:{
    $route(){
     this.$axios({
      url: "http://157.122.54.189:9095/airs",
      params: this.$route.query
    }).then(res => {
      this.airList = res.data.flights;
      this.total = res.data.total;

      //   传给筛选头页面的值
      this.flightsData = res.data
      // 缓存一份新的列表数据数据，这个列表不会被修改
      // 而flightsData会被修改
      this.cacheFlightsData = { ...res.data };
      //初始化分页
      this.setDataList();
      //   console.log(this.airList)
    });
      
    }
  },
  data() {
    return {
        //缓存的总数据
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {},
        total:0
      },
      // 传给机票详情页面的值
      airList: [],
      // 传给机票详情页面的被分页后的值
      setairList: [],
      //当前所在页面
      currentPage: 1,
      //每页显示详情条数
      pageSize: 4,
      // 总条数
      total: 0,
      // 传给筛选头页面的值
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }
    };
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  mounted() {
    this.$axios({
      url: "http://157.122.54.189:9095/airs",
      params: this.$route.query
    }).then(res => {
      this.airList = res.data.flights;
      this.total = res.data.total;

      //   传给筛选头页面的值
      this.flightsData = res.data
      // 缓存一份新的列表数据数据，这个列表不会被修改
      // 而flightsData会被修改
      this.cacheFlightsData = { ...res.data };
      //初始化分页
      this.setDataList();
      //   console.log(this.airList)
    });
  },
  methods: {
    // 设置dataList数据
    // arr是展示的新数据，该方法将会传递给过滤组件使用
    setDataList(arr) {
      // 如果有新数据从第一页开始显示
      if (arr) {
        this.currentPage = 1;
        this.flightsData.flights = arr;
        this.total = arr.length;
      }
      this.setairList = this.flightsData.flights.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      );
      // console.log('111111111',val)
    },
    //    每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.setDataList();
    },
    // 当前在第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.setDataList();
    }
  },
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
