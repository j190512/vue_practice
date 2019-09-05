import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Me from '@/components/me'
import ShopCart from '@/components/ShopCart'
import NewsList from '@/components/news/newsList'
import NewsDatail from '../components/news/newsDatail.vue'
import HotMovie from '../components/movie/hotMovie.vue'
import HotMovieDatail from '../components/movie/hotMoiveDatail.vue'
import ShopList from '../components/shop/shopList.vue'
import ShopDatail from '../components/shop/shopDatail.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    { path: '/', redirect:{ name : 'home'}},//重定向
    { name : 'home', path:'/home' ,component:Home},//首页
    {name:'me',path:'/me', component:Me},//我
    {name:'shopcart',path:'/shopcart',component:ShopCart},//购物车
    {name:'news.list',path:'/news/list',component:NewsList},//新闻列表
    {name:'news.datail',path:'/news/datail',component:NewsDatail},//新闻详情
    {name:'hotMovie',path:'/movie/hotMovie',component:HotMovie},//热播电影
    {name:'hotMovie.datail',path:'/movie/datail/:id/:apikey',component:HotMovieDatail},//电影详情
    {name:'shopList',path:'/shop/shopList',component:ShopList},//商品列表
    {name:'shopDatail',path:'/shop/datail',component:ShopDatail},//商品详情
  ],
})
