export interface Provider {
  businessName: string
  name: string
  cuit: string
  phone: string
  email: string
  wayPay: {
    code: string
    description: string
  }
  observations: string
  products: string[]
  accounts?: Account[]
}

export interface Account {
  bank: {
    code: string
    description: string
  }
  number: number
  cvu: string
  alias: string
}
