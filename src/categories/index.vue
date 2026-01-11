<template>
  <h1 style="text-align: center">分类</h1>
  <div v-for="category in categoriesData" :key="category.category">
    <h2>{{ category.category }}</h2>
    <PostList :posts="category.posts" />
  </div>
  <BackToTop />
</template>

<script setup lang="ts">
import PostList from '../_components/PostList.vue'
import { data as categoriesData } from '../_data/categories.data'
import BackToTop from '../_components/BackToTop.vue'
</script>
