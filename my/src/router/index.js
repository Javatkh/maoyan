import Vue from 'vue'
import Router from 'vue-router'

import movie from '@/components/movie'
import cinema from '@/components/cinema'
import cinemaMovie from '@/components/cinemaMovie'
import cityList from '@/components/cityList'
import login from '@/components/login'

import movieDetail from '@/components/movieDetail'
import resetreq from '@/components/resetreq'
import shows from '@/components/shows'
import signup from '@/components/signup'
import search from '@/components/search'
import mine from "@/components/mine"
import store from "@/store/store"
import seatingPlan from "@/components/seatingPlan"
import orderPay from "@/components/orderPay"
import movieOrder from "@/components/movieOrder"
import map from "@/components/map"

Vue.use(Router)

var router = new Router({
  routes: [
	{
		path: '/',
		name: 'main',
		redirect:'/movie'
	},
    {
      path: '/movie',
      name: 'movie',
      component: movie
    },{
      path: '/cinema',
      name: 'cinema',
      component: cinema
    },{
      path: '/cinemaMovie/:id/:name',
      name: 'cinemaMovie',
      component: cinemaMovie
    },{
      path: '/cityList',
      name: 'cityList',
      component: cityList
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/movieDetail',
      name: 'movieDetail',
      component: movieDetail
    },{
      path: '/resetreq',
      name: 'resetreq',
      component: resetreq
    },{
      path: '/shows/:id/:name',
      name: 'shows',
      component: shows
    },{
      path: '/signup',
      name: 'signup',
      component: signup
    },{
      path: '/search',
      name: 'search',
      component: search
    },{
      path: "/mine",
      name: "mine",
      component: mine
    },{
      path: "/seatingPlan",
      name: "seatingPlan",
      component: seatingPlan
    },{
      path: "/orderPay/:id",
      name: "orderPay",
      component: orderPay
    },{
      path: "/movieOrder",
      name: "movieOrder",
      component: movieOrder
    },{
      path: "/map",
      name: "map",
      component:map
    }
  ]
})

// 路由钩子
router.beforeEach((to, from, next) => {
  var pageList = ["/mine"];
  var isCheckPermission = pageList.indexOf(to.path) != -1;

  // ...
  console.log("to.path = " + to.path);
  if (isCheckPermission && store.getters.getIsLogin == false) {
    console.log("禁止打开mine");

    layer.open({
      content: "您还没有登录,点击后跳转到登录页",
      btn: ["是"],
      yes: function(index) {
        router.push("/login");
        layer.close(index);
      }
    });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // ...
});

// 导出
export default router;
