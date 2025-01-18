<template>
  <div class="tabs">
    <div class="tab-nav-wrapper">
      <div class="tab-nav">
        <div
          v-for="(tab, index) in tabNames"
          :key="index"
          class="tab-nav-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab }}
        </div>
      </div>
    </div>
    <div class="tab-panes">
      <component :is="tabPanes[activeTab]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, VNode } from 'vue'

const slots = useSlots() as { default: () => VNode[] }
const tabPanes = slots.default()

const tabNames = tabPanes.map((tabPane: VNode) => tabPane.props?.name)
const activeTab = ref(0)
</script>

<style scoped>
.tab-nav-wrapper {
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-nav {
  position: absolute;
  bottom: -1.5px;
  display: flex;
  gap: 16px;
}

.tab-nav-item {
  padding: 8px 16px;
  cursor: pointer;
}

.active {
  font-weight: bold;
  border-bottom: 2px solid var(--vp-c-text-1);
}
</style>
