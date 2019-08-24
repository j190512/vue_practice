<template>
  <div class="mg_bottom">
    <nav-bar title="热播电影"></nav-bar>
    <div class="movie-header">
      <ul>
        <li v-for="(city, index) in citys" :key="index">
          <a
            href="javascript:;"
            @click="witchCity(city),isChoose = index"
            :class="{'hotPink':isChoose == index}"
          >{{city}}</a>
        </li>
      </ul>
    </div>
    <div>
      <ul class="mui-table-view">
        <li class="mui-media" v-for="(item,index) in movieList" :key="index">
          <router-link :to="{name:'hotMovie.datail',params:{id:item.id,apikey:apikey}}">
            <img
              class="mui-media-object mui-pull-left"
              v-lazy="'https://images.weserv.nl/?url='+item.images.small"
            />
            <div class="mui-media-body">
              <span>片名:</span>
              <p v-text="item.title"> </p>
              <span>导演:</span>
              <p v-for="(name_list,i) in item.directors" :key="i">{{name_list.name}}</p>
              <span>评分:</span>
              <p >{{item.rating.average == 0 ? "暂无": item.rating.average}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieList: [],
      apikey: "0df993c66c0c636e29ecbb5344252a4a",
      citys: ["广州", "北京", "上海",'深圳','南京','杭州','香港','澳门'],
      // directors: [],
      isChoose: 0 //
    };
  },
  created() {
    this.witchCity(this.citys[0]); // 默认选择显示的城市
  },
  methods: {
    // getDerictors(array) {
    //   array.forEach(element => {
    //     if (!element.derictors) {
    //     //   console.log("获取导演列表失败");
    //       return;
    //     }
    //     element.directors.forEach((item, index) => {
    //       let names = [];
    //       names.push(item.name);
    //       this.directors.push(names);
    //     });
    //   });
    // //   console.log(this.derictors);
    // },
    witchCity(city) {
      this.$axios
        .get("/douban"+"in_theaters", {
          params: { apikey: this.apikey, start: 10, city: city, count: 10 }
        })
        .then(res => {
          this.movieList = res.data.subjects;
          console.log(this.movieList);
          console.log(res.data.title);
          //   console.log(res.data.subjects)
        //   this.getDerictors(this.movieList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
html,
ul,
li,
img,
p,
span {
  margin: 0;
  padding: 0;
  list-style: none;
}
.hotPink {
  color: hotpink;
}
.movie-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
}
.movie-header ul {
  /* 强制不换行 */
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0px;
  margin: 5;
  background-color: #eee;
}

/* 内容区 */
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
  object-fit: cover;
}
 .mui-table-view li {
  height: 150px;
}
.mui-media {
  position: relative;
  margin: 5px;
  background-color: #eee;
}
.mui-media-object {
  max-width: 140px;
  width: 140px;
  height: 150px;
}
.mui-media-body p {
  text-align: center;
  margin-left: 40px;
  margin-top: 5px;
  /* margin-left: 20px; */
  font-size: 16px;
  color: black;
  width: 160px;
}
.mui-media-body span {
  position: absolute;
  margin-top: 5px;
}
</style>