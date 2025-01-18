<template>
  <h1 style="text-align: center">读书</h1>
  <h2></h2>
  <Tabs class="books-tabs">
    <TabPane :name="`读过 (${booksData.collect.length})`">
      <BookCard v-for="book in booksData.collect" :key="book.item.douban_id" :book="book" />
    </TabPane>
    <TabPane :name="`在读 (${booksData.do.length})`">
      <BookCard v-for="book in booksData.do" :key="book.item.douban_id" :book="book" />
    </TabPane>
    <TabPane :name="`想读 (${booksData.wish.length})`">
      <BookCard v-for="book in booksData.wish" :key="book.item.douban_id" :book="book" />
    </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { data as booksData } from '../_data/books.data'
import Tabs from '../_components/Tabs.vue'
import TabPane from '../_components/TabPane.vue'
import BookCard from '../_components/BookCard.vue'
</script>

<style scoped>
.books-tabs {
  margin-top: 48px;
}
</style>
