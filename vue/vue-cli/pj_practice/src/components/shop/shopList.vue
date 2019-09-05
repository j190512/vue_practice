<template>
  <div class="mg_bottom wrap">
    <nav-bar title="商品列表"></nav-bar>
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="isAutoFill"
      ref="loadmore"
      class="content"
    >
      <ul class="mui-table-view mui-grid-view">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-6"
          v-for="(item,index) in goodsList"
          :key="index"
        >
          <router-link :to="{name:'shopDatail', query:{id:item.id,price:item.price}}">
            <span class="hotShop">热卖中</span>
            <img v-lazy="cacheImgUrl+item.images.small" alt />
            <span class="goodsName">{{item.title}}</span>
            <div class="price">
              <span>￥</span>
              <span class="lineThrough">100</span>
              <span>{{item.price}}</span>
            </div>
            <span class="lastNum">剩余{{total-index}}件</span>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cacheImgUrl: this.Global.cacheImgUrl,
      apikey: this.Global.apikey,
      start: 0,
      count: 10,
      total: 0,
      goodsList: [],
      allLoaded: false, //判断是否上拉刷新
      isAutoFill: false //loadmore 初始化 时  是否自动填充容器
    };
  },
  created() {
    this.$axios
      .get("/douban" + "in_theaters", {
        params: { apikey: this.apikey, start: this.start, count: this.count }
      })
      .then(res => {
        // console.log(res);
        this.total = res.data.total;
        this.goodsList = res.data.subjects;
        console.log(this.goodsList);
        this.addPrice(this.goodsList);
      });
  },
  methods: {
    //模拟价格
    addPrice(array) {
      if (array) {
        array.forEach((item, index) => {
          item.price = index + 1;
        });
      }
    },
    //下拉刷新
    loadBottom() {
      console.log("执行下拉");
      this.$refs.loadmore.onBottomLoaded();
      this.start += this.count;
      this.$axios
        .get("/douban" + "in_theaters", {
          params: { apikey: this.apikey, start: this.start, count: this.count }
        })
        .then(res => {
          this.goodsList.push.apply(this.goodsList, res.data.subjects);
          this.addPrice(res.data.subjects);
          //若请求回来的数据小于请求量，禁止调用上拉函数
          if (res.data.subjects.length < this.count) {
            this.allLoaded = true;
            MessageBox("提示", "没有数据了");
          }
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
img,
p,
span,
ul,
li {
  padding: 0;
  margin: 0;
}
/* 上拉刷新 父组件需要限制高度  同时添加overflow:scroll*/
.wrap {
  height: 640px;
  overflow-x: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.content {
  margin: 3px 3px;
}
.content .mui-table-view.mui-grid-view {
  padding: 0;
}
.content img {
  display: block;
  width: 150px;
  height: 150px;
  background-color: red;
}
.content li {
  position: relative;
  height: 245px;
  border: 1px solid black;
}
.mui-media.mui-col-xs-6 {
  text-align: center;
  margin-right: 0;
}
.hotShop {
  color: white;
  background-color: red;
  position: absolute;
  left: 0px;
  top: 0px;
  font-size: 12px;
}
.goodsName {
  font-size: 14px;
}
.price {
  text-align: left;
}
.price .lineThrough {
  text-decoration: line-through;
  color: burlywood;
}
.lastNum {
  float: right;
  font-size: 12px;
}
</style>