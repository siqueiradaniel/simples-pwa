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
}

export type Product = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
};

export type UIProduct = {
  product_id: number;
  name: string;
  unit: string;
  sell_price: number;
  category_title: string;
  image_url: string;
};

export type OrderWithUser = {
  id: number; 
  fullName: string;
  phoneNumber: string;
  status: string;
  totalPrice: number;
  dAt: string;
};

