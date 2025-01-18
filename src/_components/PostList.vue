<template>
  <p v-for="post in posts" :key="post.id">
    <a class="post-item" :href="`/posts/${formatDate(new Date(post.created_at))}/`">
      <span class="post-item-text">{{ post.title }}</span>
      <span class="post-item-text post-date">{{
        formatDisplayDate(new Date(post.created_at))
      }}</span>
    </a>
  </p>
</template>

<script setup lang="ts">
import type { Post } from '../../types/post'

defineProps<{
  posts: Post[]
}>()

const formatDate = (date: Date) => {
  const pad = (num: number): string => num.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

const formatDisplayDate = (date: Date) => {
  const pad = (num: number): string => num.toString().padStart(2, '0')
  return `${date.getFullYear().toString()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
</script>

<style scoped>
.post-item {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-brand-soft);
  position: relative;
  overflow: hidden;
}

.post-item:hover {
  color: var(--vp-c-text-1);
}

.post-item::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background-color: var(--vp-c-brand-soft);
  transform-origin: bottom center;
  transform: translateY(100%);
  transition: all 0.1s ease-in-out;
}

.post-item:hover::before {
  transform: translateY(0);
}

.post-item-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 128px);
}

.post-date {
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace; /* 使用等宽字体 */
}
</style>
