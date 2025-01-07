<template>
  <h1 style="text-align: center">标签</h1>
  <h2></h2>
  <div class="tag-list">
    <button
      v-for="tag in tagsData.filter((tag) => tag.posts.length > 0)"
      class="tag-btn"
      :class="{ 'tag-btn-active': tag.tag === activeTag }"
      :key="tag.tag"
      @click="activeTag = tag.tag"
    >
      <span>{{ tag.tag }} </span>
      <span class="count">{{ tag.posts.length }}</span>
    </button>
  </div>
  <h2>{{ activeTagPosts?.tag }}</h2>
  <PostList :posts="activeTagPosts?.posts || []" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as tagsData } from '../_data/tags.data'
import PostList from '../_components/PostList.vue'

const activeTag = ref('')
const activeTagPosts = computed(() => tagsData.find((tag) => tag.tag === activeTag.value))
</script>

<style scoped>
.tag-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.tag-btn {
  padding: 8px 8px 8px 12px;
  border: 1px solid;
  border-radius: 6px;
  position: relative;
}

.tag-btn:hover {
  background: var(--vp-c-brand-soft);
}

.tag-btn-active {
  background: var(--vp-c-brand-soft);
}

.tag-btn-active::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background-color: var(--vp-c-brand-soft);
}

.count {
  display: inline-block;
  padding: 0 8px;
  margin-left: 8px;
  border-radius: 4px;
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-3);
}
</style>
