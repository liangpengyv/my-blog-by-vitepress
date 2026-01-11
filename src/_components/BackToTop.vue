<template>
  <button
    v-show="isVisible"
    class="back-to-top"
    :class="{ 'back-to-top-visible': isVisible }"
    @click="scrollToTop"
    aria-label="返回顶部"
  >
    <svg
      class="back-to-top-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15L12 9L6 15"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 300 // 滚动超过 300px 时显示按钮

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isVisible.value = scrollTop > scrollThreshold
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // 初始化时检查一次
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-3);
  color: var(--vp-c-white);
  border: 1px solid var(--vp-c-brand-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgb(0 0 0 / 15%),
    0 2px 4px rgb(0 0 0 / 10%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  z-index: 1000;
  padding: 0;
}

.back-to-top-visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-white);
  transform: translateY(-2px);
  box-shadow:
    0 8px 16px rgb(0 0 0 / 20%),
    0 4px 8px rgb(0 0 0 / 15%);
}

.back-to-top:active {
  transform: translateY(0);
}

.back-to-top-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.back-to-top:hover .back-to-top-icon {
  transform: translateY(-2px);
}

/* 移动端适配 */
@media (width <= 768px) {
  .back-to-top {
    width: 44px;
    height: 44px;
    bottom: 20px;
    right: 20px;
  }

  .back-to-top-icon {
    width: 20px;
    height: 20px;
  }
}

/* 小屏幕移动端 */
@media (width <= 480px) {
  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 16px;
    right: 16px;
  }

  .back-to-top-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
