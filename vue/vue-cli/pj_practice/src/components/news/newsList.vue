<template>
  <div class="mg_bottom">
    <nav-bar title="新闻"></nav-bar>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="news in newList" :key="news.uniquekey">
        <router-link :to="{name:'news.datail',query:{url:news.url}}">
          <img class="mui-media-object mui-pull-left" :src="news.thumbnail_pic_s" />
          <div class="mui-media-body">
            <span v-text="news.title"></span>
            <div class="news-desc">
              <p v-text="news.author_name"></p>
              <p v-text="news.date"></p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newList: []
    };
  },
  created() {
    this.$axios
      .get(`/juhe/index?type=top&key=780d8e9820919d498c7de6a4684b2828`)
      .then(res => {
        this.newList = res.data.result.data;
        // console.log(res.data.result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

</script>

<style  scoped>
.mui-media-body span {
  font-size: 14px;
}
.mui-media-body p {
  font-size: 12px;
}
.news-desc p:nth-child(1) {
  float: left;
}
.news-desc p:nth-child(2) {
  float: right;
}
</style>>
