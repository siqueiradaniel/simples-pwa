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

// O resumo que aparece na lista principal
export type InventorySummary = {
  config_id: number;
  branch_id: number;
  product_id: number;
  sell_price: number;
  min_stock_limit: number;
  is_available: boolean;
  product_name: string;
  product_code: string;
  image_url: string | null;
  unit: string;
  category_title: string;
  total_stock: number;
  next_expiration: string | null;
  average_cost: number;
};

// O detalhe do lote (quando clicar no produto)
export type ProductBatch = {
  id: number;
  branch_product_config_id: number;
  batch_code: string | null;
  quantity: number;
  initial_quantity: number;
  cost_price: number;
  expiration_date: string | null;
  arrival_date: string;
  supplier: string | null;
  status: 'active' | 'consumed' | 'expired';
};

export type Address = {
  id?: number; // Opcional na criação
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string | null;
  reference?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type UserAddress = {
  id: number;
  user_id: number;
  address_id: number;
  label: string; // "Casa", "Trabalho", "Outro"
  is_default: boolean;
  address?: Address; // Join
};

export type SupermarketUser = {
  id: number; // ou string/uuid dependendo da sua tabela real, ajustei para number conforme seu schema anterior mas atenção se for uuid
  full_name: string;
  email: string;
  phone_number: string;
  user_role: 'ADMIN' | 'CUSTOMER' | 'MANAGER';
  is_active: boolean;
  is_blocked: boolean;
  last_login: string | null;
  supermarket_chain_id: number;
  created_at: string;
};

export type OrderDetails = {
  order_id: number;
  status: 'PENDING' | 'PAID' | 'CANCELED' | 'FINISHED' | 'EM_PRODUCAO' | 'A_CAMINHO' | 'DELIVERED'; // Ajuste conforme seu ENUM real
  payment_status: string;
  order_number: number;
  created_at: string;
  finished_at: string | null;
  total_price: number;
  delivery_fee: number;
  discount: number;
  customer_name: string;
  customer_phone: string;
  street: string;
  address_number: number | null;
  neighborhood: string;
  city: string;
  state: string;
  complement: string | null;
  reference: string | null;
  market_name: string;
  market_logo: string | null;
  branch_name: string;
};

export type OrderItem = {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product_name: string;
  product_image: string | null;
  product_unit: string;
};

// Tipo específico para manipulação no carrinho (mais leve que OrderItem completo)
export type CartItem = {
  product_id: number;
  quantity: number;
  unit_price: number;
  name: string;
  image_url: string | null;
  unit: string;
  subtotal: number;
};

// Tipo para envio ao backend (Sync)
export type CartItemInput = {
  product_id: number;
  quantity: number;
};