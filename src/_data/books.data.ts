import { defineLoader } from 'vitepress'
import type { Books } from '../../types/book'

declare const data: Books
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/books.json`)).default,
})
