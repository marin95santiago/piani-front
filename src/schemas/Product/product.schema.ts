export interface Product {
  code: string
  description: string
  brand: string
  checked?: boolean
  quantity?: number
}

export interface ProductsByCategory {
  category: {
    code: string
    description: string
  }
  products: Product[]
}