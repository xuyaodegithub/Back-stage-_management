import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "../utils/auth";
//导入
import NProgress from 'nprogress'//跳转路由进度条
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true,
      meta: {name: '3类', icon: 'el-icon-share'}
    },
    {path: '/404', component: () => import('@/views/404'), hidden: true, meta: {name: '3类', icon: 'el-icon-share'}},
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/Product-list',
      component: () => import(/* webpackChunkName: "artStore" */ '@/views/HelloWorld'),
      meta: {name: '商品管理', icon: 'el-icon-menu'},
      children: [
        {
          path: 'Product-list',
          name: 'Product-list',
          component: () => import(/* webpackChunkName: "artStore" */ '@/views/produMeneage/Product-index'),
          meta: {name: '外卖商品', icon: 'el-icon-goods'}
        }, {
          path: 'Order-index',
          name: 'Order-index',
          component: () => import(/* webpackChunkName: "Order-index" */ '@/views/produMeneage/Order-index.vue'),
          meta: {name: '订单管理', icon: 'el-icon-star-on'}
        },/*{
          path: 'three121',
          name: '404',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/404'),
          meta: {name: '404', icon: 'el-icon-share'}
        }*/
      ]
    },/* {
      path: '/OrderManagement',
      name: 'second',
      redirect: '/second/one0',
      component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/HelloWorld'),
      meta: {name: 'second', icon: 'el-icon-star-on'},
      children: [
        {
          path: 'two0',
          name: 'two0',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/OrderManagement/index'),
          meta: {name: '2类', icon: 'el-icon-star-on'}
        }, {
          path: 'three0',
          name: 'three0',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/three/index'),
          meta: {name: '3类', icon: 'el-icon-share'}
        },
      ]
    },*//* {
      path: '/threed',
      name: 'threed',
      redirect: '/threed/one1',
      component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/HelloWorld'),
      meta: {name: 'threed', icon: 'el-icon-star-on'},
      children: [
        {
          path: 'one1',
          name: 'one1',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/produMeneage/index'),
          meta: {name: '1类', icon: 'el-icon-menu'}
        }, {
          path: 'two1',
          name: 'two1',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/OrderManagement/index'),
          meta: {name: '2类', icon: 'el-icon-star-on'}
        }, {
          path: 'three1',
          name: 'three1',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/three/index'),
          meta: {name: '3类', icon: 'el-icon-share'}
        }, {
          path: 'three121',
          name: '404',
          component: () => import(/!* webpackChunkName: "artStore" *!/ '@/views/404'),
          meta: {name: '404', icon: 'el-icon-share'}
        }
      ]
    }*/
  ],
  scrollBehavior(to, from, savedPosition) {//路由切换时滚轮位置//scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    // console.log(typeof  JSON.parse(getToken()),'yyyyyyyyyyyyyyyyyyyyyy')
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next()
    }
  } else {
    // console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(to.path);
      next({path: `/login?redUrl=${to.path}`})
    }
  }
  // next()
});
router.afterEach(() => {
  NProgress.done();
});
export default router
