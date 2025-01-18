<template>
  <div v-for="post in posts" :key="post.id">
    <a class="post-item" :href="`/posts/${formatLinkDate(new Date(post.created_at))}/`">
      <h2 class="title">{{ post.title }}</h2>
      <div class="introduction">{{ getPlainText(post.content) }}</div>
      <hr class="break" />
      <div>
        <span class="created-date">
          {{ formatDisplayDate(new Date(post.created_at)) }}
        </span>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import frontmatter from 'front-matter'
import markdownIt from 'markdown-it'
import type { Post } from '../../types/post'

defineProps<{
  posts: Post[]
}>()

const md = markdownIt()

const getPlainText = (markdown: string) => {
  const content = frontmatter(markdown).body
  const html = md.render(content)
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent
}

const formatLinkDate = (date: Date) => {
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
  display: block;
  margin: 16px 0;
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

.title {
  border-top: none;
  margin: 0;
  padding: 4px 0 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
}

.title::before {
  content: none;
}

.introduction {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}

.break {
  margin: 8px 0;
}

.created-date {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-family: 'Courier New', Courier, monospace; /* 使用等宽字体 */
}
</style>
