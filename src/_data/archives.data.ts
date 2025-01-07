import { defineLoader } from 'vitepress'
import type { PostsOfArchive } from '../../types/post'

declare const data: PostsOfArchive[]
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/archives.json`)).default,
})
