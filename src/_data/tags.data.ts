import { defineLoader } from 'vitepress'
import type { PostsOfTag } from '../../types/post'

declare const data: PostsOfTag[]
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/tags.json`)).default,
})
