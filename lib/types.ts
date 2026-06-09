export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  character: string
  movie: string
  affiliateLink: string
  category: string
  gender: string
  style: string
}

export interface Character {
  id: string
  name: string
  movie: string
  actor: string
  image: string
  description: string
  style: string
  lookTags: string[]
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  character: string
  movie: string
  products: string[]
  style: string
}

export interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  likes: number
  comments: number
  tags: string[]
}

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  endDate: string
}
