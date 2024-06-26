<script setup lang="ts">
import {getArticleList} from "@/api/articleApi";
import type {ArticleListReq, IArticle, Page} from "@/api/interface/articleType";
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const request = ref<ArticleListReq>({
  categoryId: "",
  tagId: "",
  keyword: "",
  pageNumber: 1,
  pageSize: 1000
} as ArticleListReq);


const articlePageInfo = ref({
  current: 1,
  total: 0,
  records: [] as IArticle[]
} as Page<IArticle>)

function articleList(keyword?: string, currentPage?: number, pageSize?: number) {
  request.value.keyword = keyword;
  if (currentPage) {
    request.value.pageNumber = currentPage;
  }
  if (pageSize) {
    request.value.pageSize = pageSize
  }
  getArticleList(request.value).then(result => {
    articlePageInfo.value = result.data;
  }).catch(error => {
  })
}

// 页面挂载时，渲染
onMounted(() => {
  articleList("")
})

function handleEditor(scope: any) {
  const {row} = scope;
  const articleId = row.articleId;
  console.log("##handleEditor articleId= ", articleId)
}

const deleteArticleWindows = (articeleId: string) => {
  ElMessageBox.confirm(
      '该文章将永久删除，是否继续？',
      '重要提醒',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {

    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
  }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除成功！',
        })
      })
}

function handleDelete(scope: any) {
  const {row} = scope;
  const articleId = row.articleId;
  console.log("##handleDelete articleId= ", articleId)
  deleteArticleWindows(articleId)
}

</script>

<template>
  <el-table v-if="articlePageInfo.records"
            :data="articlePageInfo.records"
            style="width: 100%" height="800"
            border
            header-cell-class-name="zj-el-table-title"
  >
    <el-table-column fixed prop="title" label="文章标题" width="150"/>
    <el-table-column prop="articleAbstract" label="文章摘要" width="300"/>
    <el-table-column prop="createTime" label="创建时间" width="120"/>
    <el-table-column prop="headerImageUrl" label="摘要图片" width="200" />
    <el-table-column prop="path" label="文章路径" width="120"/>
    <el-table-column prop="type" label="文章类型"/>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="handleEditor(scope)"
        >
          编辑
        </el-button>
        <el-button
            link
            type="danger"
            size="small"
            @click.prevent="handleDelete(scope)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.zj-el-table-title {
  text-align: center !important;
}
</style>
