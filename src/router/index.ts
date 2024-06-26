import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleEditorForm from "@/components/ArticleEditorForm.vue";
import ArticlePublishView from "@/views/ArticlePublishView.vue";
import ArticleListView from "@/views/ArticleListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/publish',
      name: '发布文章',
      component: ArticlePublishView
    },
    {
      path: '/article/list',
      name: '文章列表',
      component: ArticleListView
    },

  ]
})

export default router
