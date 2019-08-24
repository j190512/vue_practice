<template>
  <div>
    <nav-bar title="详情"></nav-bar>
    <a :href="[url]">将跳转至东方新闻网显示详情</a>
  </div>
</template>

<script>
export default {
    data(){
        return{
            url:this.$route.query.url
        }
    },
    created(){
        //获取地址
        
        
    }
};
</script>

<style>
</style>