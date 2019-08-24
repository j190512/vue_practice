<template>
  <div class="mg_bottom">
    <nav-bar title="电影详情"></nav-bar>
    <div class="title">{{m_datail.title}}({{m_datail.year}})</div>
    <div class="info">
      <div class="info_img">
        <img
          v-if="m_datail.images&&m_datail.images.small"
          :src="['https://images.weserv.nl/?url='+m_datail.images.small]"
          alt
        />
      </div>
      <div class="info_list">
        <span>
          导演:
          <span v-for="(item,index) in m_datail.directors" :key="index">{{item.name}}</span>
        </span>
        <br />
        <span>
          主演:
          <span v-for="(item,index) in m_datail.casts" :key="index">{{item.name}}</span>
        </span>
        <br />
        <span>
          类型:
          <span v-for="(item,index) in m_datail.genres" :key="index">{{item}}</span>
        </span>
        <br />
        <span>
          国家/地区:
          <span v-for="(item,index) in m_datail.countries" :key="index">{{item}}</span>
        </span>
        <br />
        <span>
          语言:
          <span v-for="(item,index) in m_datail.languages" :key="index">{{item}}</span>
        </span>
        <br />
        <span v-for="(item,index) in m_datail.durations" :key="index">片长:{{item}}</span>
        <br />
        <span v-if="m_datail.rating&&m_datail.rating.average">评分: {{m_datail.rating.average}}</span>
        <br />
        <span>评分人数:{{m_datail.ratings_count}}</span>
      </div>
    </div>
    <div class="summary">
      <h4>剧情介绍</h4>
      <p style=" text-indent:2em">{{m_datail.summary}}</p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      m_datail: []
    };
  },
  created() {
    let m_id = this.$route.params.id;
    let m_apikey = this.$route.params.apikey;
    this.$axios
      .get("/douban" + "subject/" + m_id, {
        params: {
          apikey: m_apikey
        }
      })
      .then(res => {
        this.m_datail = res.data;
        console.log(this.m_datail);
        this.shift(this.m_datail.directors, "name");
        this.shift(this.m_datail.casts, "name");
        this.shift(this.m_datail.genres);
        this.shift(this.m_datail.countries);
        this.shift(this.m_datail.languages);
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    shift(array, str) {
      let length = array.length;
      if (str) {
        array.forEach((element, index) => {
          if (index + 1 == length) {
            return;
          }
          element[str] = element[str] + " / ";
        });
      } else {
        for (let i = 0; i < length; i++) {
          if (i + 1 == length) {
            return;
          }
          array[i] = array[i] + "/";
        }
      }
    }
  }
};
</script>

<style>
image,
span {
  padding: 0;
  margin: 0;
}
.title {
  text-align: center;
  margin-top: 8px;
  margin-bottom: 5px;
}
.info {
  width: 100%;
}
.info .info_img {
  height: 150px;
  text-align: center;
}
.info .info_img img {
  height: 150px;
  width: 150px;
}
.info .info_list {
  margin-left: 5px;
}
.info .info_list span {
  line-height: 1.49;
}
.summary {
  margin-left: 3px;
  margin-bottom: 1em;
}
</style>