<template >
  <div class="mg_bottom">
    <div ref="outPic" class="outPic">
      <img src="../assets/img/QR code.png" alt />
    </div>
    <nav-bar title="购物车"></nav-bar>
    <div class="buy" v-show="isShow">
      <ul>
        <li v-for="(item,index) in goods" :key="index">
          <div class="img">
            <img v-for="i in item" :key="i.img" :src='Global.cacheImgUrl + i.img' alt />
          </div>
          <div class="desc_area">
            <div>
              <span v-for="i in item" :key="i.titel">{{i.title}}</span>
            </div>
            <div>
              <span v-for="i in item" :key="i.price">￥{{i.price}}</span>
            </div>
            <div class="num">
              <span @click="reduceNum(item)">-</span>
              <span v-for="i in item" :key="i.num">{{i.num}}</span>
              <span @click="addNum(item)">+</span>
            </div>
          </div>
          <div class="mui-input-row mui-checkbox chb">
            <label>选择</label>
            <input v-model="check" :value="index" type="checkbox" @click="change" />
          </div>
        </li>
      </ul>
    </div>
    <div class="box" v-show="!isShow">
      <div class="msg">购物车空，去逛逛吧</div>
      <router-link :to="{name:'shopList'}">
        <button class="btn">去购物</button>
      </router-link>
    </div>
    <div class="operation">
      <div class="pay">
        <button class="payMoney" @click="alertP">结账</button>
        <span>
          ￥
          <span class="fontColor">{{totalPrice}}</span>
        </span>
      </div>
      <div class="allchb">
        <span :class="{color:isCheckKind==1?true:false}" @click="isCheckKind=1,select()">全选</span>|
        <span :class="{color:isCheckKind==2?true:false}" @click="isCheckKind=2,select()">全不选</span>|
        <button class="delBtn" @click="del">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入连接对象
import connect from "./component/connect";
// 引入存储的方法
import storeTools from "./component/storeTools";
// 引入消息提示框
import { MessageBox } from "mint-ui";
//引入mui 的js文件 目的使用 遮罩
import mui from "../../static/mui/dist/js/mui";
export default {
  data() {
    return {
      totalPrice: 0,
      isCheckKind: 2,
      goods: {},
      check: [],
      isShow: false
    };
  },
  created() {
    this.goods = storeTools.getInfo();
    //不是空数据，页面渲染
    for (let i in this.goods) {
      if (i) {
        this.isShow = true;
      }
    }
  },
  methods: {
    getTotalPrice() {
      if (this.check == "") {
        this.totalPrice = 0;
        return;
      }
      this.totalPrice = 0;
      this.check.forEach(item => {
        for (let id in this.goods) {
          if (item == id) {
            this.goods[id].forEach(i => {
              this.totalPrice += i.num * i.price;
            });
          }
        }
      });
    },
    change() {
      //v-model="check" @click="change"  执行顺序：先click后v-model
      setTimeout(() => {
        if (Object.keys(this.goods).length == this.check.length) {
          //全选
          this.isCheckKind = 1;
          console.log("全选");
        } else if (this.check.length == 0) {
          //全不选
          this.isCheckKind = 2;
          console.log("全不选");
        } else {
          this.isCheckKind = 0;
        }
        this.getTotalPrice();
        // console.log(this.check);
      });
    },
    select() {
      if (this.isCheckKind == 1) {
        for (let id in this.goods) {
          this.check.push(id);
        }
      }
      if (this.isCheckKind == 2) {
        this.check = [];
      }
      this.getTotalPrice();
    },
    reduceNum(item) {
      item.forEach(i => {
        if (i.num < 2) {
          return;
        } else {
          i.num--;
        }
        
      });
      storeTools.save(this.goods);
      this.getTotalPrice();
      //数据改变，购物车的红数点改变
      connect.$emit("change", storeTools.getTotal());
    },
    addNum(item) {
      item.forEach(i => {
        if (i.num > 4) {
          return;
        } else {
          i.num++;
        }
      });
      storeTools.save(this.goods);
      this.getTotalPrice();
      connect.$emit("change", storeTools.getTotal());
    },
    del() {
      if (this.check != "") {
        this.check.forEach(item => {
          //删除存储指定的数据
          storeTools.delete(item);
        });
        //删除选中的数据
        this.check.splice(0, this.check.length);
        connect.$emit("refresh", storeTools.getTotal());
        this.goods = storeTools.getInfo();
        if (JSON.stringify(this.goods) == "{}") {
          // 将json对象转化为json字符串，再判断该字符串是否为"{}"
          this.isShow = false;
        }
        //删除后重新计算价格
        this.getTotalPrice();
      } else {
        "提示", "请选择要删除的商品";
      }
    },
    alertP() {
      if (this.check == "") {
        return;
      }
      this.$refs.outPic.style.display = "block";
      var mask = mui.createMask(()=> {
        this.$refs.outPic.style.display = "none";
      });

      // this.$refs.outPic.innerHTML = "<img"+'src=../assets/img/callme.png'+"alt />"
      mask.show(); //显示遮罩
    }
  }
};
</script>

<style scoped>
span,
ul,
li,
img {
  padding: 0;
  margin: 0;
  list-style: none;
}
/* 弹出图片的样式 */
.outPic {
  position: absolute;
  z-index: 999;
  display: none;
  /*  实现绝对定位元素居中表示*/
  left: 50%;
  /* margin-left: -100px;元素宽度的一半 
  margin-top:元素高度的一半
  */
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
}
.outPic img {
  width: 200px;
  height: 200px;
}
/*购买样式*/
.buy {
  width: 100%;
  height: 100%;
  padding: 5px;
  overflow: hidden;
  position: relative;
  margin-bottom: 85px; /*手动测量离结账栏距离*/
}
.buy li {
  width: 100%;
  height: 150px;
}
.buy li .img {
  float: left;
  width: 150px;
  height: 100%;
  text-align: center;
  line-height: 150px;
}
.buy li img {
  width: 120px;
  height: 130px;
  vertical-align: middle;
}
.buy .desc_area {
  float: left;
  width: 200px;
  height: 100%;
  padding: 10px;
}
.buy .desc_area div {
  margin: 5px 0;
}
.buy .desc_area .num span {
  text-align: center;
  display: inline-block;
  border: 1px solid black;
  width: 30px;
}

/*购物车为空，将显示的页面的样式*/
.box {
  width: 250px;
  height: 150px;
  /* border: 1px solid black; */
  margin: 150px auto;
}
.box .msg {
  color: red;
  font-size: 20px;
  font: bolder;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.box .btn {
  height: 30px;
  width: 100%;
  background-color: red;
  color: wheat;
  border-radius: 20px;
}
/* 复选框 */
.chb {
  position: absolute;
  right: 0;
  margin-top: 30px;
}
/* 是否全选 */
.allchb {
  position: absolute;
  right: 0;
}
.allchb .color {
  color: gold;
}
/* 删除或者结账 */
.operation {
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
  width: 100%;
  height: 40px;
  background-color: #26a2ff;
  line-height: 40px;
}
/*结账*/
.operation .pay {
  position: absolute;
  width: 160px;
  height: 100%;
  margin-left: 50px;
}
/* 删除按钮 */
.operation .delBtn {
  vertical-align: middle;
  padding: 0;
  line-height: 30px;
  height: 30px;
  width: 40px;
  border-radius: 10px;
}
/* 结账按钮 */
.operation .payMoney {
  vertical-align: middle;
  padding: 0;
  line-height: 30px;
  height: 30px;
  width: 40px;
  border-radius: 10px;
  background-color: red;
  color: white;
}

.operation .fontColor {
  color: rgb(240, 53, 53);
}
</style>