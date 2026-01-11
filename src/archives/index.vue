<template>
  <h1 style="text-align: center">归档</h1>
  <div v-for="archive in archivesData" :key="archive.year">
    <h2>{{ archive.year }}</h2>
    <PostList :posts="archive.posts" />
  </div>
  <BackToTop />
</template>

<script setup lang="ts">
import PostList from '../_components/PostList.vue'
import { data as archivesData } from '../_data/archives.data'
import BackToTop from '../_components/BackToTop.vue'
</script>
