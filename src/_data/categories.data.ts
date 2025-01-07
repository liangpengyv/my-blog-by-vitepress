import { defineLoader } from 'vitepress'
import type { PostsOfCategory } from '../../types/post'

declare const data: PostsOfCategory[]
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/categories.json`)).default,
})
