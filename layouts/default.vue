<template>
  <div>
    <!-- 引入之前写好的头部组件 -->
    <Header></Header>
    <nuxt />
    <!-- 相当于router.view -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>
/* 这里面放的是公共样式,因此不要加scoped */
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
  /* 继承父级颜色 */
}

em,i{
  font-style: normal;
}
</style>
