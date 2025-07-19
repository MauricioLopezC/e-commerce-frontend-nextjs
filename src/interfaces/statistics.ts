export interface TotalSalesByMonth {
  month: Date
  total_sales: string
}

export interface SalesByCategory {
  id: number,
  categoryname: string,
  total: number
}
