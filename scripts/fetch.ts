import { fetch as fluxpressFetch } from 'fluxpress'
import type { Issues } from 'fluxpress'
import fse from 'fs-extra'
import frontmatter from 'front-matter'
import type { Post, PostsOfArchive, PostsOfCategory, PostsOfTag } from '../types/post'

const fetchGitHubData = async () => {
  const issuesData = await fluxpressFetch('issues')
  await fse.outputJSON('data/issues.json', issuesData, { spaces: 2 })
}

const parsePosts = async (issuesData: Issues) => {
  const posts: Post[] = issuesData.issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    category: issue.milestone ? issue.milestone.title : undefined,
    tags: issue.labels.map((label) => (typeof label === 'string' ? label : label.name || '')),
    content: issue.body || '',
    comments: issue.comments_list.map((comment) => ({
      content: comment.body || '',
    })),
    created_at: new Date(
      frontmatter<{ date: string }>(issue.body || '').attributes.date || issue.created_at,
    ).toISOString(),
    updated_at: new Date(issue.updated_at).toISOString(),
  }))
  posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  await fse.outputJSON('data/posts.json', posts, { spaces: 2 })
}

const parseArchives = async (posts: Post[]) => {
  const archives: PostsOfArchive[] = []
  for (let i = 0; i < posts.length; i++) {
    const year = new Date(posts[i].created_at).getFullYear().toString()
    const postsOfArchive: PostsOfArchive = {
      year,
      posts: [posts[i]],
    }
    for (let j = i + 1; j < posts.length; j++) {
      if (new Date(posts[j].created_at).getFullYear().toString() === year) {
        postsOfArchive.posts.push(posts[j])
        i++
      } else {
        break
      }
    }
    archives.push(postsOfArchive)
  }
  await fse.outputJSON('data/archives.json', archives, { spaces: 2 })
}

const parseCategories = async (issuesData: Issues, posts: Post[]) => {
  const categories: PostsOfCategory[] = []
  issuesData.milestones.forEach((milestone) => {
    const postsOfCategory: PostsOfCategory = {
      category: milestone.title,
      posts: posts.filter((post) => post.category === milestone.title),
    }
    categories.push(postsOfCategory)
  })
  await fse.outputJSON('data/categories.json', categories, { spaces: 2 })
}

const parseTags = async (issuesData: Issues, posts: Post[]) => {
  const tags: PostsOfTag[] = []
  issuesData.labels.forEach((label) => {
    const tag = typeof label === 'string' ? label : label.name || ''
    const postsOfTag: PostsOfTag = {
      tag,
      posts: posts.filter((post) => post.tags.includes(tag)),
    }
    tags.push(postsOfTag)
  })
  await fse.outputJSON('data/tags.json', tags, { spaces: 2 })
}

const main = async () => {
  await fetchGitHubData()
  await parsePosts(await fse.readJSON('data/issues.json'))
  await parseArchives(await fse.readJSON('data/posts.json'))
  await parseCategories(
    await fse.readJSON('data/issues.json'),
    await fse.readJSON('data/posts.json'),
  )
  await parseTags(await fse.readJSON('data/issues.json'), await fse.readJSON('data/posts.json'))
}

main()
