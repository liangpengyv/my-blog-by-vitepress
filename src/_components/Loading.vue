<template>
  <div class="loader">
    <div class="outer"></div>
    <div class="middle"></div>
    <div class="inner"></div>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  width: 32px;
  height: 32px;
}

.outer,
.middle,
.inner {
  border: 2px solid transparent;
  border-top-color: var(--vp-c-brand-1);
  border-right-color: var(--vp-c-brand-1);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}

.outer {
  width: 32px;
  height: 32px;
  margin-left: -16px;
  margin-top: -16px;
  animation: spin 1.2s linear infinite;
}

.middle {
  width: 24px;
  height: 24px;
  margin-left: -12px;
  margin-top: -12px;
  animation: spin 0.9s linear reverse infinite;
}

.inner {
  width: 16px;
  height: 16px;
  margin-left: -8px;
  margin-top: -8px;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
