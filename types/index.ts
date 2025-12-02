export type SupermarketChain = {
  id: number 
  cnpj: string 
  name: string 
  logoUrl: string
  deliveryEndTime: number
  minimumOrderValue: number
}

export type StockLevel = 'low' | 'medium' | 'high' | 'out_of_stock'

export type BranchProduct = {
  id: number
  stockQuantity: number
  initialQuantity: number
  minQuantity: number
  wantedQuantity: number
  buyPrice: number
  sellPrice: number
  profit: number
  totalCost: number | null
  totalToEarn: number | null
  currentEarn: number | null
  stockLevel: StockLevel
  expirationDate: string
  isAvailable: boolean
  isPromotion: boolean
  productId: number
  branchId: number
  // Dados adicionais para exibição
  productName: string
  productImage: string
  brand: string
  unit: string
}