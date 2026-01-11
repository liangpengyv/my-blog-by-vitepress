import fse from 'fs-extra'
import frontmatter from 'front-matter'
import { Post } from '../types/post'

const generatePosts = async () => {
  const posts: Post[] = await fse.readJSON('data/posts.json')
  for (const post of posts) {
    const filePath = `posts/${formatDate(new Date(post.created_at))}/index.md`
    await fse.outputFile(`src/${filePath}`, parsePostContent(post))
  }
}

const formatDate = (date: Date) => {
  const pad = (num: number): string => num.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

const parsePostContent = (post: Post) => {
  const importVue = `
<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>
`
  const postHeader = `
<PostHeader :postId='${post.id}' />
`

  const editInfo = `
<EditInfo editLink='${post.html_url}' lastUpdated='${formatDisplayDate(new Date(post.updated_at))}' />
`

  const backToTop = `
<BackToTop />
`

  const frontmatterObj = frontmatter(post.content)

  return `
---
${frontmatterObj.frontmatter}
---
${importVue}
${postHeader}
${frontmatterObj.body}
${editInfo}
${backToTop}
`.trim()
}

const formatDisplayDate = (date: Date) => {
  const pad = (num: number): string => num.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  )
}

const main = async () => {
  await generatePosts()
}

main()
