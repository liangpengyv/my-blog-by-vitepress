<template>
  <div class="tab-pane">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
