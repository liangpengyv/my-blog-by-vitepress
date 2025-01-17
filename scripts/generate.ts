import fse from 'fs-extra'
import frontmatter from 'front-matter'
import { Post } from '../types/post'

const generatePosts = async () => {
  const posts: Post[] = await fse.readJSON('data/posts.json')
  for (const post of posts) {
    await fse.outputFile(
      `src/posts/${formatDate(new Date(post.created_at))}/index.md`,
      parsePostContent(post),
    )
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
  const insertContent = `
<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='${post.id}' />
`

  const frontmatterObj = frontmatter(post.content)
  console.log(frontmatterObj)

  return `
---
${frontmatterObj.frontmatter}
---
${insertContent}
${frontmatterObj.body}
`.trim()
}

const main = async () => {
  await generatePosts()
}

main()
