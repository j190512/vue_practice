<template>
  <div class="mg_bottom">
    <nav-bar title="详情"></nav-bar>
    <div class="content">
      <div class="swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in imgUrl" :key="index">
            <img v-lazy="Global.cacheImgUrl+item.avatars.small" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="prodect">
        <div class="name">{{info.title}}</div>
        <div class="price">
          原价:
          <span class="priceOriginal">100</span>
          现价:
          <span class="priceNow">{{price}}</span>
        </div>
        <div class="num">
          购买数量:
          <span @click="reduceNum">-</span><span>{{num}}</span><span @click="addNum">+</span>
          总价: {{total}}
        </div>
      </div>
      <div class="buy">
        <button @click="addShopCart">加入购物车</button>
        <button>确认购买</button>
      </div>
      <div class="summary">
        <h4>介绍</h4>
        <p>{{info.summary}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//引入组件通信对象
import connect from "../component/connect";
import storeTools from "../component/storeTools";
export default {
  data() {
    return {
      //购物车中需要的值
      id: this.$route.query.id,
      title: "",
      img: "",
      price: this.$route.query.price,
      num: 1,

      total: this.$route.query.price,
      info: [],
      imgUrl: []
    };
  },
  created() {
    this.$axios
      .get("/douban" + "subject/" + this.id, {
        params: {
          apikey: this.Global.apikey
        }
      })
      .then(res => {
        this.title = res.data.title;
        this.img = res.data.images.small;

        this.imgUrl = res.data.casts;
        //有些数据 内容为null 替换
        this.imgUrl.forEach(item => {
          if (item.avatars === null) {
            item.avatars = {};
            item.avatars.small = res.data.images.small;
          }
        });
        // console.log(this.imgUrl);
        this.info = res.data;
        // console.log(res.data);
      });
  },
  methods: {
    reduceNum() {
      if (this.num > 1) {
        this.num--;
        this.total = this.num * this.price;
      }
    },
    addNum() {
      if (this.num > 0) {
        this.num++;
        this.total = this.num * this.price;
      }
    },
    addShopCart() {
      storeTools.addOrUpdata({
        id: this.id,
        title: this.title,
        img: this.img,
        price: this.price,
        num: this.num
      });
      connect.$emit("AddShopCart", storeTools.getTotal());
    }
  },
};
</script>

<style scoped>
span,
button {
  margin: 0;
  padding: 0;
}
.content {
  margin: 0 3px;
}
.content .swipe {
  text-align: center;
  height: 180px;
}
.content .swipe img {
  height: 180px;
}
.content .prodect {
  margin-left: 16px;
}
.content .prodect div {
  margin-top: 10px;
}
.content .prodect .name {
  font-size: 24px;
  color: firebrick;
}
.content .prodect .price .priceOriginal {
  color: darkgrey;
  text-decoration: line-through;
}
.content .prodect .price .priceNow {
  color: balck;
  font-size: 20px;
}
.content .prodect .num span {
  text-align: center;
  display: inline-block;
  border: 1px solid black;
  width: 30px;
}
.content .buy {
  margin-top: 10px;
  text-align: center;
}
.content .buy button {
  width: 45%;
  height: 40px;
  background-color: red;
}
.content .summary p {
  text-indent: 2em;
}
.swipe {
  background-color: plum;
}
</style>