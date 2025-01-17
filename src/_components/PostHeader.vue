<template>
  <div class="post-header">
    <h1>{{ post.title }}</h1>
    <p class="post-meta">
      <span class="post-created-date">{{ formatDate(new Date(post.created_at)) }}</span>
      <span v-if="post.category">
        分类：<span class="post-category">{{ post.category }}</span>
      </span>
      <span v-if="post.tags.length">
        标签：<span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '../../types/post'
import { data as postsData } from '../_data/posts.data'

const props = defineProps<{
  postId: number
}>()

const post = postsData.find((post: Post) => post.id === props.postId) as Post

const formatDate = (date: Date) => {
  const pad = (num: number): string => num.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
</script>

<style scoped>
.post-meta {
  display: flex;
  gap: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.post-category {
  color: var(--vp-c-brand-1);
}

.post-tag {
  font-size: 12px;
  margin-right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.post-tag:last-child {
  margin-right: 0;
}
</style>
