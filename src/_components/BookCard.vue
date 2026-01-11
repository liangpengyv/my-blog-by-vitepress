<template>
  <div class="book-card">
    <div class="book-image">
      <div v-if="isLoading" class="image-placeholder">
        <div class="placeholder-content"></div>
      </div>
      <img
        ref="imageRef"
        class="image"
        :class="{ 'image-hidden': isLoading || hasError }"
        :src="book.item.thumbnail"
        :alt="book.item.title"
        loading="lazy"
        @load="handleImageLoad"
        @error="handleImageError"
      />
      <div v-if="hasError" class="image-error">
        <span class="error-text">图片加载失败</span>
      </div>
    </div>
    <div class="book-info">
      <a
        class="title"
        :href="`https://book.douban.com/subject/${book.item.douban_id}/`"
        target="_blank"
      >
        {{ book.item.title }}
      </a>
      <p v-if="book.item.author" class="info-item">作者：{{ book.item.author }}</p>
      <p v-if="book.item.press" class="info-item">出版社：{{ book.item.press }}</p>
      <p v-if="book.item.producer" class="info-item">出品方：{{ book.item.producer }}</p>
      <p v-if="book.item.subtitle" class="info-item">副标题：{{ book.item.subtitle }}</p>
      <p v-if="book.item.orititle" class="info-item">原作名：{{ book.item.orititle }}</p>
      <p v-if="book.item.translator" class="info-item">译者：{{ book.item.translator }}</p>
      <p v-if="book.item.publish_date" class="info-item">出版年：{{ book.item.publish_date }}</p>
    </div>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, nextTick } from 'vue'
import { Book } from '../../types/book'

const props = defineProps<{
  book: Book
}>()

const isLoading = ref(true)
const hasError = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)

const checkImageStatus = () => {
  if (imageRef.value) {
    // 如果图片已经加载完成（从缓存加载），直接更新状态
    if (imageRef.value.complete) {
      if (imageRef.value.naturalWidth > 0) {
        isLoading.value = false
        hasError.value = false
      } else {
        isLoading.value = false
        hasError.value = true
      }
    }
  }
}

const handleImageLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleImageError = () => {
  isLoading.value = false
  hasError.value = true
}

// 监听图片 src 变化，重置状态
watch(
  () => props.book.item.thumbnail,
  () => {
    isLoading.value = true
    hasError.value = false
    nextTick(() => {
      checkImageStatus()
    })
  },
  { immediate: false },
)

// 组件挂载后检查图片状态
onMounted(() => {
  // 使用多次 nextTick 确保 DOM 已更新
  nextTick(() => {
    nextTick(() => {
      checkImageStatus()
      // 如果图片还没加载，设置一个延迟检查（处理快速加载的情况）
      if (isLoading.value && imageRef.value && !imageRef.value.complete) {
        // 创建一个新的 Image 对象来预检查
        const img = new Image()
        img.onload = () => {
          if (imageRef.value && imageRef.value.src === img.src) {
            handleImageLoad()
          }
        }
        img.onerror = () => {
          if (imageRef.value && imageRef.value.src === img.src) {
            handleImageError()
          }
        }
        img.src = props.book.item.thumbnail
      }
    })
  })
})

// 组件更新后也检查一次（处理 tab 切换的情况）
onUpdated(() => {
  if (isLoading.value) {
    nextTick(() => {
      checkImageStatus()
    })
  }
})
</script>

<style scoped>
.book-card {
  display: flex;
  gap: 16px;
  margin: 16px 4px;
}

.book-image {
  width: 135px;
  flex-shrink: 0;
  position: relative;
  overflow: visible;
  min-height: 180px;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow:
    0 4px 12px rgb(0 0 0 / 10%),
    0 2px 4px rgb(0 0 0 / 6%);
  display: block;
  object-fit: cover;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: opacity 0.3s ease;
}

.image-hidden {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.placeholder-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 30%) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.image-error {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--vp-c-divider);
}

.error-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  padding: 8px;
}

.book-info {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}

.info-item {
  margin: 8px 0;
  font-size: 13px;
  line-height: 14px;
}
</style>
