export interface BookMeta {
  douban_id: number
  title: string
  subtitle: string
  orititle: string
  author: string
  translator: string
  press: string
  producer: string
  publish_date: string
  thumbnail: string
}

export interface Book {
  item: BookMeta
  label: string
  comment: string
  mark_date: string
}

export interface Books {
  wish: Book[]
  do: Book[]
  collect: Book[]
}
