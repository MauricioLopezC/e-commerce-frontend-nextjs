import { Product } from "./products/product"
import { Category } from "./products/categories"

export interface Discount {
  id: number
  name: string
  description?: string
  discountType: DiscountType
  value: number
  startDate: Date
  endDate: Date
  applicableTo: ApplicableTo
  orderThreshold?: number
  maxUses?: number
  currentUses: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  products: Product[]
  categories: Category[]
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'
}

export enum ApplicableTo {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  GENERAL = 'GENERAL'
}
