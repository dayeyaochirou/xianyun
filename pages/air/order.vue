<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="infoData"
                @setTotalPrice="setTotalPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside  
                :data="infoData"
                :price="price"/>
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
    data(){
        return{
            // 初始化传递表单组件的值
            infoData:{ 
                insurances:[],
                seat_infos: {}
            },
            //接收表单组件发来的总价
            price:{}
        }
    },
    components: {
        OrderForm,
        OrderAside
    },
    mounted () {
        // console.log(this.$route)
        this.$axios({
            url:`http://157.122.54.189:9095/airs/${this.$route.query.id}`,
            params:{
                seat_xid:this.$route.query.seat_xid
            }
        }).then(res=>{
            this.infoData=res.data
            // console.log(this.infoData)
        })
    },
    methods: {
        setTotalPrice(priceAndUse){
            this.price=priceAndUse
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>