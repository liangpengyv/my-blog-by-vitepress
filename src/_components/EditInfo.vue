<template>
  <div class="edit-info">
    <div class="edit-link">
      <a class="edit-link-button" :href="editLink" target="_blank" rel="noreferrer">
        <span class="edit-link-icon square-pen"></span>
        在 GitHub 上编辑此页面
      </a>
    </div>
    <div class="last-updated">
      <p class="last-updated-text">
        最后更新于:
        <time>{{ lastUpdated }}</time>
      </p>
    </div>
  </div>
  <hr class="" />
</template>

<script setup lang="ts">
defineProps<{
  editLink: string
  lastUpdated: string
}>()
</script>

<style scoped>
.edit-info {
  margin-top: 64px;
}

@media (width >= 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
  text-decoration: inherit;
}

.edit-link-icon {
  margin-right: 8px;
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  background-color: currentcolor;
  color: inherit;
  width: 1em;
  height: 1em;
}

.square-pen {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z'/%3E%3C/svg%3E");
}

.last-updated-text {
  margin: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
