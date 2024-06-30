import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlePublishView from "@/views/ArticlePublishView.vue";
import ArticleListView from "@/views/ArticleListView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import {useUserStore} from "@/router/userStore";
import Cookies from "js-cookie";
import DocusaurusConfigView from "@/views/DocusaurusConfigView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true, // 标记需要认证的路由
      },
    },
    {
      path: '/article/publish',
      name: '发布文章',
      component: ArticlePublishView,
      meta: {
        requiresAuth: true, // 标记需要认证的路由
      },
    },
    {
      path: '/article/list',
      name: '文章列表',
      component: ArticleListView,
      meta: {
        requiresAuth: true, // 标记需要认证的路由
      },
    },
    {
      path: '/site/config',
      name: '站点配置',
      component: DocusaurusConfigView,
      meta: {
        requiresAuth: true, // 标记需要认证的路由
      },
    },
    {
      path: '/login',
      name: '登录',
      component: LoginView
    },
    {
      path: '/register',
      name: '注册',
      component: RegisterView
    },

  ]
})
// 在 router 对象上添加全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  let zsUserToken = Cookies.get("zsUserToken");
  console.log("to.meta.userStore.isLoggedIn: ", userStore.isLoggedIn, " zsUserToken: ", zsUserToken)
  if (to.meta.requiresAuth && !zsUserToken && zsUserToken != '') {
    // 用户需要认证，但当前未登录，重定向到登录页面
    next('/login');
  } else {
    // 其他情况，继续前往目标路由
    next();
  }
});
export default router
