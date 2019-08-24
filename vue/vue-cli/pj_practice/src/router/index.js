import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Search from '@/components/Search'
import ShopCart from '@/components/ShopCart'
import NewsList from '@/components/news/newsList'
import NewsDatail from '../components/news/newsDatail.vue'
import HotMovie from '../components/movie/hotMovie.vue'
import HotMovieDatail from '../components/movie/hotMoiveDatail.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    { path: '/', redirect:{ name : 'home'}},//重定向
    { name : 'home', path:'/home' ,component:Home},//首页
    {name:'member',path:'/member' ,component:Member},//会员
    {name:'search',path:'/search', component:Search},//查找
    {name:'shopcart',path:'/shopcart',component:ShopCart},//购物车
    {name:'news.list',path:'/news/list',component:NewsList},
    {name:'news.datail',path:'/news/datail',component:NewsDatail},
    {name:'hotMovie',path:'/movie/hotMovie',component:HotMovie},
    {name:'hotMovie.datail',path:'/movie/datail/:id/:apikey',component:HotMovieDatail}
  ],
})
