import { defineLoader } from 'vitepress'
import type { Issues } from 'fluxpress'

declare const data: Issues
export { data }

export default defineLoader({
  load: async () => (await import(`../../data/issues.json`)).default,
})
