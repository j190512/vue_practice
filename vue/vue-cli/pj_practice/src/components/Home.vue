<template>
  <div>
    <!-- home 轮播图 -->
    <!-- <mt-swipe :auto="4000" class="swipe-height">
      <mt-swipe-item v-for="(item,index) in imgs" :key='index'>
        <img :src="item.url" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    <mt-swipe :auto="4000" class="swipe-height">
      <mt-swipe-item v-for="item in 3" :key="item">
        {{item}}
      </mt-swipe-item>
    </mt-swipe>
    <!-- grid  栅格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'news.list'}">
            <span class="mui-icon news"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'hotMovie'}">
            <span class="mui-icon picShare">
            </span>
            <div class="mui-media-body">电影资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon goodShow"></span>
            <div class="mui-media-body">商品展示</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon feedback"></span>
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon search"></span>
            <div class="mui-media-body">搜索资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon callme"></span>
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="callme"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      imgs: [] //轮播图列表
    };
  },
  created() {
    // this.$axios.get("http://jsonplaceholder.typicode.com/photos").then(res => {
    //   //获取轮播图数据
    //   for(let i = 0;i<3;i++){
    //     this.imgs.push(res.data[i]);
    //   }
    // })
    // .catch(err=>{
    //   console.log(err);
    // });
  }
};
</script>

<style scoped>
/* 轮播图样式 */
.swipe-height {
  height: 187px;
}
/* 九宫格 */
.mui-table-view.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: 0;
}
.mui-table-view.mui-grid-view.mui-grid-9 li{
  border: 0;
}
/* 九宫格背景图片 */
.mui-icon{
  height: 50px;
  width: 50px;
  background-repeat:round;
  /* 背景图像自动缩放直到适应且填充满整个容器。（CSS3） */
}
.news{
  background-image: url('../assets/img/news.png');
}
.picShare{
  background-image: url('../assets/img/picShare.png');
}
.search{
  background-image: url('../assets/img/search.png');
}
.goodShow{
  background-image: url('../assets/img/goodShow.png');
}
.feedback{
  background-image: url('../assets/img/feedback.png');
}
.callme{
  background-image: url('../assets/img/callme.png');
}
</style>
