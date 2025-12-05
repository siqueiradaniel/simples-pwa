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

export type SupermarketWithBranch = {
  chain_id: number;
  chain_name: string;
  chain_logo: string;
  chain_cnpj: string;
  branch_id: number;
  branch_name: string;
  branch_phone: string;
  branch_email: string;
  street: string;
  number: number | null;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
};

export type AdminProduct = {
  product_id: number;
  code: string;
  name: string;
  description: string | null;
  image_url: string | null;
  unit: string;
  units_sold: number;
  category_title: string;
  total_stock_quantity: number;
  min_price: number | null;
  max_price: number | null;
};

// NOVO TIPO PARA A TELA DE BRANCH
export type BranchManagement = {
  branch_id: number;
  branch_name: string;
  branch_email: string;
  branch_phone: string;
  address_id: number | null;
  supermarket_chain_id: number;
  chain_name: string;
  chain_logo: string;
  street: string;
  number: number | null;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
};