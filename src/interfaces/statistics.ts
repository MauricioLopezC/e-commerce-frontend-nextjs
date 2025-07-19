export interface TotalSalesByMonth {
  month: Date
  total_sales: string
}

export interface SalesByCategory {
  id: number,
  categoryName: string,
  total: number
}

export interface SalesByProduct {
  name: string
  total: number
}
