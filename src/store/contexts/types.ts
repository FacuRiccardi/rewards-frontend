export interface User {
  id: string
  username: string
  password: string
  name: string
  points: number
}

export interface Reward {
  id: number
  title: string
  subtitle: string
  price: number
}

export interface Redemption {
  id: number
  rewardTitle: string
  rewardSubtitle: string
  redeemedAt: string
}

export interface Pagination {
  currentPage: number,
  totalPages: number
}