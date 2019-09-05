<template>
  <div class="mg_bottom">
    <nav-bar title="电影详情"></nav-bar>
    <div class="title">{{m_datail.title}}({{m_datail.year}})</div>
    <div class="info">
      <div class="info_img">
        <img
          v-if="m_datail.images&&m_datail.images.small"
          :src="[cacheImgUrl+m_datail.images.small]"
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
      <p style="text-indent:2em">{{m_datail.summary}}</p>
      <br />
    </div>
    <hr />
    <div class="comments">
      <h5>影评</h5>
      <textarea v-model="new_comment" cols="30" rows="2" class="new_comment_textarea"></textarea>
      <button @click="addComment" class="comment_btn">提交评论</button>
      <ul>
        <li v-for="(item,index) in m_comments" :key="index">
          <span>{{item.author.name}}:</span>
          <span class="time">{{item.created_at}}</span>
          <p>{{item.content}}</p>
        </li>
      </ul>
      <button @click="moreComments" class="comment_btn">更多评论</button>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      cacheImgUrl:this.Global.cacheImgUrl,
      m_datail: [], //电影详情
      m_id: this.$route.params.id,
      m_apikey: this.$route.params.apikey,
      m_comments: [],
      new_comment: "",
      start: 0,
      count: 3
    };
  },
  created() {
    this.$axios
      .all([this.getInfo(this.m_id).movie, this.getInfo().movie_comments])
      .then(
        this.$axios.spread((res, res_comments) => {
          this.m_datail = res.data;
          // console.log(res);
          this.shift(this.m_datail.directors, "name");
          this.shift(this.m_datail.casts, "name");
          this.shift(this.m_datail.genres);
          this.shift(this.m_datail.countries);
          this.shift(this.m_datail.languages);
          //影评
          this.m_comments = res_comments.data.comments;
          console.log(this.m_comments);
        })
      );
  },
  methods: {
    //格式数据
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
    },
    //获取数据
    getInfo() {
      let that = this;
      let obj = {
        //电影数据
        movie: that.$axios.get("/douban" + "subject/" + this.m_id, {
          params: {
            apikey: this.m_apikey
          }
        }),
        //评论数据
        movie_comments: that.$axios.get(
          "/douban" + "subject/" + this.m_id + "/comments",
          {
            params: {
              apikey: this.m_apikey,
              start: this.start,
              count: this.count
            }
          }
        )
      };
      return obj;
    },
    //更多评论
    moreComments() {
      this.start += this.count;
      this.$axios
        .get("/douban" + "subject/" + this.m_id + "/comments", {
          params: {
            apikey: this.m_apikey,
            start: this.start, //从第几项开始
            count: this.count //请求的数目
          }
        })
        .then(res => {
          if (res.data.comments == "") {
            MessageBox("提示", "暂无更多的评论");
            return;
          }
          this.m_comments.push.apply(this.m_comments, res.data.comments); //新旧数组合并
        });
    },
    //模拟添加评论，页面刷新 ，自加的评论清空
    addComment() {
      if (this.new_comment == "") {
        MessageBox("提示", "评论不能为空");
        return;
      }
      //使用moment.js 格式时间
      let moment = require("moment");
      let created = moment().format("YYYY-MM-DD HH:MM:SS");

      MessageBox("提示", "提交成功");
      this.m_comments.push({
        author: {
          name: "匿名用户"
        },
        created_at: created,
        content: this.new_comment
      });
      console.log(this.m_comments);
      this.new_comment = "";
    }
  }
};
</script>

<style scoped>
/**/
image,
span,
ul,
li,
textarea,
button,
p {
  list-style: none;
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
}

/*影评*/
.comments {
  margin: 0px 3px;
}
.comments p {
  padding: 10px;
  padding-top: 5px;
  text-indent: 2em;
}
.comments .time {
  font-size: 14px;
  margin-right: 10px;
  float: right;
}
.comments .new_comment_textarea {
  padding: 2px;
  margin-bottom: 0px;
}
.comments .comment_btn {
  width: 100%;
  background-color: #eee;
  margin-bottom: 3px;
  line-height: 1.8;
}
</style>