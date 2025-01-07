<template>
  <h1 style="text-align: center">首页</h1>
  <h2></h2>
  <PostList :posts="currentPosts" />
  <div class="load-more-wrapper">
    <button class="load-more-btn" v-show="!isLoading && hasMorePosts" @click="loadMorePosts">
      加载更多
    </button>
    <Loading class="load-more-loading" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { data as postsData } from './_data/posts.data'
import PostList from './_components/PostList.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import Loading from './_components/Loading.vue'

const perPage = 3
const currentPage = ref(1)
const currentPosts = ref(postsData.slice(0, perPage))

const isLoading = ref(false)
const hasMorePosts = ref(postsData.length > perPage)

const handleScroll = async () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
  if (bottomOfWindow) {
    await loadMorePosts()
  }
}

const loadMorePosts = async () => {
  const nextPage = currentPage.value + 1
  const start = (nextPage - 1) * perPage
  const end = nextPage * perPage
  const newAddPosts = postsData.slice(start, end)

  if (newAddPosts.length === 0) return

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))
  currentPosts.value = currentPosts.value.concat(newAddPosts)
  currentPage.value = nextPage
  isLoading.value = false

  if (postsData.slice(end, end + 1).length === 0) hasMorePosts.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.load-more-wrapper {
  position: relative;
  text-align: center;
  height: 40px;
}

.load-more-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4px 8px;
  border: 1px solid;
  border-radius: 4px;
}

.load-more-btn:hover {
  background: var(--vp-c-brand-soft);
}

.load-more-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
