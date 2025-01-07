import { defineLoader } from 'vitepress'
import type { Post } from '../../types/post'

declare const data: Post[]
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/posts.json`)).default,
})
