<template>
  <div class="book-card">
    <div class="book-image">
      <img class="image" :src="book.item.thumbnail" :alt="book.item.title" />
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
import { Book } from '../../types/book'

defineProps<{
  book: Book
}>()
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
