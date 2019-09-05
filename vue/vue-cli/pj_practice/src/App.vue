<template>
  <div>
    <!-- 头部 -->
    <mt-header title="信息系统"></mt-header>
    <router-view></router-view>
    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" :to="{name:'home'}">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>

      <router-link class="mui-tab-item" :to="{name:'shopcart'}">
        <span class="mui-icon icon-gouwuche">
          <span class="mui-badge">{{num}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'me'}">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">我</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import connect from './components/component/connect'
import storeTools from './components/component/storeTools'
export default {
  data() {
    return {
      num:0
    };
  },
  created() {
    this.num = storeTools.getTotal();
    // let that = this;
    // connect.$on('addShopCart',function(num){
    //     that.num+=num;
    // })
    connect.$on('AddShopCart',num=>{
      this.num = num;
    })
    connect.$on('change',num=>{
      this.num = num;    
    })
    connect.$on('refresh',num=>{
      this.num = num;
    })
  },
  methods:{
  }
};
</script>

<style>
</style>
