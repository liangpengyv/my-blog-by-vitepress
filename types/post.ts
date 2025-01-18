export interface Comment {
  content: string
}

export interface Post {
  id: number
  number: number
  html_url: string
  title: string
  category: string | undefined
  tags: string[]
  content: string
  comments: Comment[]
  created_at: string
  updated_at: string
}

export interface PostsOfArchive {
  year: string
  posts: Post[]
}

export interface PostsOfCategory {
  category: string
  posts: Post[]
}

export interface PostsOfTag {
  tag: string
  posts: Post[]
}
